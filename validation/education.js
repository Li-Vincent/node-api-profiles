const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateEducationInput(data) {
    data.school = !isEmpty(data.school) ? data.school : ""
    data.degree = !isEmpty(data.degree) ? data.degree : ""
    data.major = !isEmpty(data.major) ? data.major : ""
    data.from = !isEmpty(data.from) ? data.from : ""

    let errors = {};
    if (Validator.isEmpty(data.school)) {
        errors.school = "学校不能为空！"
    }
    if (Validator.isEmpty(data.degree)) {
        errors.degree = "学历不能为空！"
    }
    if (Validator.isEmpty(data.major)) {
        errors.major = "专业不能为空！"
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = "起始时间不能为空！"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}