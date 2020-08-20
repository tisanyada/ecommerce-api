const router = require('express').Router();
const adminController = require('../controllers/admin');
// const adminAuthController = require('../controllers/admin-auth');
const passport = require('passport');



// register
router.post('/register', adminController.register);


// login
router.post('/login', adminController.login);


// get all products
router.get('/products', passport.authenticate('admin', { session: false }), adminController.getProducts);


// create product
router.post('/create-product', passport.authenticate('admin', { session: false }), adminController.createProduct);


// get product by id
router.get('/products/:id', passport.authenticate('admin', { session: false }), adminController.getProductById);


// update product
router.patch('/products/:id', passport.authenticate('admin', { session: false }), adminController.updateProduct);


// delete product
router.delete('/products/delete/:id', passport.authenticate('admin', { session: false }), adminController.deleteProduct);


module.exports = router;