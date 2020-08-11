const User = require('../models/User');
const bcrypt = require('bcryptjs');

const issueToken = require('../middlewares/token').issueUserToken;


const validateRegisterInput = require('../validations/signup');
const validateLoginInput = require('../validations/login');


exports.register = (req, res) => {
    const { username, email, password } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        res.status(400).json(errors);
    } else {
        User.findOne({ 'username': username })
            .then(isUser => {
                if (isUser) {
                    errors.username = 'username is already exists, please choose another';
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