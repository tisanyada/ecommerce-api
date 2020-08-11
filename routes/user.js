const router = require('express').Router();
const userController = require('../controllers/user');
const userAuthController = require('../controllers/user-auth');
const passport = require('passport');



// register
router.post('/register', userController.register);


// login
router.post('/login', userController.login);


// get products
// router.get('/products', passport.authenticate('user', { session: false }));

// get cart
router.get('/cart', passport.authenticate('user', { session: false }), userAuthController.getCart);


module.exports = router;