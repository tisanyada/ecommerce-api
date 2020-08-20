const Admin = require('../models/Admin');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');


const issueToken = require('../middlewares/token').issueUserToken;
const { imageUpload, deleteImage } = require('../middlewares/fileConfig');


const validateRegisterInput = require('../validations/signup');
const validateLoginInput = require('../validations/login');
const validateProductInput = require('../validations/createproduct');
const Order = require('../models/Order');



exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else {
        Admin.findOne({ 'username': username })
            .then(isUser => {
                if (isUser) {
                    errors.username = 'username is already exists, please choose another username';
                    res.status(400).json(errors);
                }
                bcrypt.hash(password, 12)
                    .then(hashedPassword => {
                        const admin = new Admin({
                            username,
                            email,
                            password: hashedPassword
                        });
                        admin.save()
                            .then(user => {
                                res.json({ success: true, user: user });
                            })
                            .catch(err => {
                                console.log(err);
                                res.json(500).json({ message: 'an error occured while creating a new admin' })
                            })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json({ message: 'an error occured while generating password hash' })
                    });
            })
            .catch(err => {
                console.log(err);
                res.json({ message: 'an error while checking for already existing admin' });
            });
    }
}


exports.login = (req, res) => {
    const { username, password } = req.body;
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else {
        Admin.findOne({ 'username': username })
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
                res.status(500).json({ message: 'failed to find admin on login' });
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
            res.status(500).json({ message: 'an error occured while fetching products' });
        });
}


exports.createProduct = (req, res) => {
    const { title, price, description } = req.body;
    const image = req.file;
    const { errors, isValid } = validateProductInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else if (!imageUpload(image)) {
        errors.image = 'image is required or image type not supported. use jpeg, jpg or png file formats';
        res.status(400).json(errors);
    } else {
        Product.findOne({ 'title': title })
            .then(product => {
                if (product) {
                    errors.title = 'a product with this title already exists';
                    res.status(400).json(errors);
                } else {
                    const prod = new Product({
                        adminId: req.user.id,
                        title,
                        price,
                        description,
                        imageUrl: image.path
                    });
                    prod.save()
                        .then(product => {
                            res.json({ success: true, product: product });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ message: 'an error occured while creating new product' });
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'an error occured while locating product with title' });
            });
    }
}



exports.getProductById = (req, res) => {
    Product.findOne({ '_id': req.params.id })
        .then(product => {
            res.json({ success: true, product: product });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ message: 'an error occured while fetching product from db' });
        });
}


exports.updateProduct = (req, res) => {
    const { title, price, description } = req.body;
    const image = req.file;
    const { errors, isValid } = validateProductInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else if (!imageUpload(image)) {
        errors.image = 'image is required or image type not supported. use jpeg, jpg or png file formats';
        res.status(400).json(errors);
    } else {
        Product.findOne({ '_id': req.params.id })
            .then(product => {
                product.title = title;
                product.price = price;
                product.description = description;
                if (image) {
                    deleteImage(product.imageUrl);
                    product.imageUrl = image.path;
                }
                return product.save();
            })
            .then(result => {
                res.json({ success: true, product: result });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ message: 'an error occured while fetching product from db' });
            });
    }
}


exports.deleteProduct = (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id }, (err, done) => {
        if (err) {
            res.json({ message: 'an error occured while deleting product' })
        } else {
            res.json({ message: 'product deleted successfully' });
        }
    });
}