const validator = require('validator');
const isEmpty = require('./isempty');


module.exports = function validateSignupInput(data) {
    const errors = {};


    data.title = !isEmpty(data.title) ? data.title : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.description = !isEmpty(data.description) ? data.description : '';

    if(!validator.isLength(data.title, {min: 4, max: 20})){
        errors.title = 'product title must between four(4) and twenty(20) characters';
    }
    if(validator.isEmpty(data.title)){
        errors.title = 'product title is required';
    }

    if(validator.isEmpty(data.price)){
        errors.price = 'product price is required';
    }

    if(validator.isEmpty(data.description)){
        errors.description = 'product description is required';
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}