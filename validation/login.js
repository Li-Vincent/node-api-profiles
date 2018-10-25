const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateLoginInput(data) {
    let errors = {};
    if (!Validator.isLength(data.email, { min: 2, max: 30 })) {
        errors.name = "名字的长度不能小于2位并且不能大于30位！"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}