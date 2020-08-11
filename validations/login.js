const validator = require('validator');
const isEmpty = require('./isempty');


module.exports = function validateSignupInput(data) {
    const errors = {};


    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';


    if(validator.isEmpty(data.username)){
        errors.username = 'username is required';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}