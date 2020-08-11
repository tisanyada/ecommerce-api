const router = require('express').Router();
const userControllers = require('../controllers/user');
const passport = require('passport');



// register
router.post('/register', userControllers.register);


// login
router.post('/login', userControllers.login);

router.get('/user', passport.authenticate('user', { session: false }), (req, res) => {
    res.json(req.user);
});


module.exports = router;