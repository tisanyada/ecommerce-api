const validator = require('validator');
const passwordvalidator = require('password-validator');
const isEmpty = require('./isempty');


module.exports = function validateSignupInput(data) {
    const errors = {};


    data.username = !isEmpty(data.username) ? data.username : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';


    const passwordSchema = new passwordvalidator();
    passwordSchema.has().lowercase().has().uppercase().has().digits();

    if(!validator.isLength(data.username, {min: 6, max:15})){
        errors.username = 'username must be between six(6) and fifteen(15) characters';
    }
    if(validator.isEmpty(data.username)){
        errors.username = 'username is required';
    }

    if(!validator.isEmail(data.email)){
        errors.email = 'invalid email address';
    }
    if(validator.isEmpty(data.email)){
        errors.email = 'email address is required';
    }

    if (!validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = 'password must be between six(6) and twenty(20) characters';
    }
    if(!passwordSchema.validate(data.password)){
        errors.password = 'password must have at least one upper and lowercase letter and a digit';
    }
    if(!validator.equals(data.password, data.confirmPassword)){
        errors.password = 'passwords do not match';
    }
    if(validator.isEmpty(data.password)){
        errors.password = 'password is required';
    }
    if(validator.isEmpty(data.confirmPassword)){
        errors.confirmPassword = 'confirm password is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}