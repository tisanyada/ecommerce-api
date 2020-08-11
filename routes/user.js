const router = require('express').Router();
const userControllers = require('../controllers/user');
const passport = require('passport');



// register
router.post('/register', userControllers.register);


// login
router.post('/login', userControllers.login);


// get products
// router.get('/products', passport.authenticate('user', { session: false }));

// get cart
router.get('/cart', passport.authenticate('user', { session: false }), );


module.exports = router;