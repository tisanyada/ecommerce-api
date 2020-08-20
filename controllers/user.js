const User = require('../models/User');
const Cart = require('../models/Cart');
const Order = require('../models/Order');
const Product = require('../models/Product');

const bcrypt = require('bcryptjs');
const issueToken = require('../middlewares/token').issueUserToken;


const validateRegisterInput = require('../validations/signup');
const validateLoginInput = require('../validations/login');
const validateCartInput = require('../validations/cart');


exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else {
        User.findOne({ 'username': username })
            .then(isUser => {
                if (isUser) {
                    errors.username = 'username is already exists, please choose another username';
                    res.status(400).json(errors);
                }
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const user = new User({
                            username,
                            email,
                            password: hashedPassword
                        });
                        user.save()
                            .then(user => {
                                res.json({ success: true, user: user });
                            })
                            .catch(err => {
                                console.log(err);
                                res.json(500).json({ message: 'an error occured while creating a new user' })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json({ message: 'an error occured while generating password hash' })
                    });
            })
            .catch(err => {
                console.log(err);
                res.json({ message: 'an error while checking for already existing user' });
            });
    }
}


exports.login = (req, res) => {
    const { username, password } = req.body;
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else {
        User.findOne({ 'username': username })
            .then(user => {
                if (!user) {
                    errors.username = 'username is unregistered, please verify and try again';
                    res.status(400).json(errors);
                }
                bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch) {
                            const { token, expiresIn } = issueToken(user);
                            res.json({ success: true, token: token, expiresIn: expiresIn });
                        } else {
                            errors.password = 'incorrect password';
                            res.status(400).json(errors);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        // res.json({ message: 'failed to compare user password on login' });
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'failed to find user on login' });
            });
    }
}



exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.json({ success: true, products: products });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching products from db' });
        });
}


exports.getCart = (req, res) => {
    Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            res.json({ success: true, cart: cart });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching cart items from db' });
        });
}



exports.createCart = (req, res) => {
    const id = req.params.id;

    Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            Product.findOne({ '_id': id })
                .then(product => {
                    if (cart === null) {
                        const cart = new Cart({
                            userId: req.user.id,
                            items: [
                                { product: id, title: product.title, price: product.price, quantity: 1 }
                            ]
                        });
                        cart.save()
                            .then(result => {
                                res.json({ success: true, cart: result });
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({ message: 'an error occured while creating new cart' });
                            });
                    } else {
                        const cartIndex = cart.items.findIndex(index => index.product == id);
                        if (cartIndex > -1) {
                            let cartItem = cart.items[cartIndex];

                            // console.log(cartItem.quantity);
                            cartItem.quantity += 1;
                            cartItem.price = 0;
                            cartItem.price = product.price * (cartItem.quantity);
                            cart.items[cartIndex] = cartItem;
                            cart.save()
                                .then(result => {
                                    res.json({ success: true, cart: result });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ message: 'an error occured while updating user cart' });
                                });
                        } else {
                            cart.items.push({
                                product: id,
                                title: product.title,
                                price: product.price,
                                quantity: 1
                            });
                            cart.save()
                                .then(result => {
                                    res.json({ success: true, cart: result });
                                })
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json({ message: 'an error occured while creating new cart' });
                                });
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ message: 'an error occured while fetching product from db' });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching cart from db' });
        });
}




exports.getCartById = (req, res) => {
    const id = req.params.id;
    Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            console.log(cart.items)
            const cartIndex = cart.items.findIndex(index => index.id == id);
            const cartItem = cart.items[cartIndex];
            res.json({ success: true, cartItem: cartItem });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching cart item from db' });
        });
}




exports.deleteCartItem = (req, res) => {
    const id = req.params.id;
    Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            const cartIndex = cart.items.findIndex(index => index.id == id);
            cart.items[cartIndex].remove();
            return cart.save();
        })
        .then(result => {
            res.json({ success: true, cartItems: result });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching cart item from db' });
        });
}




exports.deleteCart = (req, res) => {
    Cart.findOneAndDelete({ 'userId': req.user.id }, (err, done) => {
        if (err) {
            console.log(err);
        } else {
            res.json({ message: 'successfully deleted cart' })
        }
    });
}



exports.getOrders = (req, res) => {
    Order.find({ 'userId': req.user.id })
        .then(orders => {
            res.json({ success: true, orders: orders });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching orders from db' });
        });
}


exports.createOrder = (req, res) => {
    const cartId = req.params.id;
    Cart.findOne({ 'userId': req.user.id })
        .then(cart => {
            const cartIndex = cart.items.findIndex(item => item.id == cartId);
            const cartItem = cart.items[cartIndex];
            if (cartIndex > -1) {
                const order = new Order({
                    userId: req.user.id,
                    productId: cartItem.product,
                    title: cartItem.title,
                    price: cartItem.price,
                    quantity: cartItem.quantity,
                });
                cart.items[cartIndex].remove();
                cart.save();
                order.save()
                    .then(result => {
                        res.json({ success: true, order: result });
                    })
                    .catch(err => console.log(err));
            } else {
                res.status(404).json({ message: 'cart item does not exist' });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching user cart' });
        });
}


exports.deleteOrder = (req, res) => {
    Order.find({ 'userId': req.user.id })
        .then(orders => {
            const deleteIndex = orders.findIndex(index => index.id == req.params.id);
            return orders[deleteIndex].remove();
        })
        .then(result => {
            res.json({ success: true, orders: result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching user orders from db' });
        });
}
