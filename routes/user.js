const router = require('express').Router();
const userController = require('../controllers/user');
const passport = require('passport');



// register
router.post('/register', userController.register);



// login
router.post('/login', userController.login);


// get products
router.get('/products', passport.authenticate('user', { session: false }), userController.getProducts);

// get cart
router.get('/cart', passport.authenticate('user', { session: false }), userController.getCart);


// create cart
router.post('/cart/add/:id', passport.authenticate('user', { session: false }), userController.createCart);


// get cart by id
router.get('/cart/:id', passport.authenticate('user', { session: false }), userController.getCartById);


router.patch('/cart/delete/:id', passport.authenticate('user', { session: false }), userController.deleteCartItem);


// delete cart
router.delete('/cart/delete', passport.authenticate('user', { session: false }), userController.deleteCart);


// get orders
router.get('/orders', passport.authenticate('user', { session: false }), userController.getOrders);


router.post('/orders/create/:id', passport.authenticate('user', { session: false }), userController.createOrder);


// delete order
router.patch('/orders/delete/:id', passport.authenticate('user', { session: false }), userController.deleteOrder);


module.exports = router;