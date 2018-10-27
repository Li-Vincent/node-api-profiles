const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data) {
    data.text = !isEmpty(data.text) ? data.text : ""
    let errors = {};
    if (Validator.isEmpty(data.text)) {
        errors.email = "评论不能为空！"
    } else if (!Validator.isLength(data.text, { min: 20, max: 300 })) {
        errors.password = "评论不能小于20或大于300个字符！"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}