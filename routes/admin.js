const router = require('express').Router();
const adminController = require('../controllers/admin');
const adminAuthController = require('../controllers/admin-auth');
const passport = require('passport');


// register
router.post('/register', adminController.register);


// login
router.post('/login', adminController.login);


// get all products
router.get('/products', passport.authenticate('admin', { session: false }), adminAuthController.getProducts);


// create product
router.post('/create-product', passport.authenticate('admin', { session: false }), adminAuthController.createProduct);



module.exports = router;