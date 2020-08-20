const validator = require('validator');
const isEmpty = require('./isempty');


module.exports = function validateSignupInput(data) {
    const errors = {};


    // data.title = !isEmpty(data.title) ? data.title : '';
    data.quantity = !isEmpty(data.quantity) ? data.quantity : '';
    // data.price = !isEmpty(data.price) ? data.price : '';


    // if (validator.isEmpty(data.title)) {
    //     errors.title = 'product title is required';
    // }
    if(!validator.isInt(data.quantity)){
        errors.quantity = 'product quantity must be an integer';
    }
    if (validator.isEmpty(data.quantity)) {
        errors.quantity = 'product quantity is required';
    }
    // if (validator.isEmpty(data.price)) {
    //     errors.price = 'product price is required';
    // }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}