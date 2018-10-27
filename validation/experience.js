const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
    data.title = !isEmpty(data.title) ? data.title : ""
    data.company = !isEmpty(data.company) ? data.company : ""
    data.from = !isEmpty(data.from) ? data.from : ""

    let errors = {};
    if (Validator.isEmpty(data.title)) {
        errors.title = "个人经历标题不能为空！"
    }
    if (Validator.isEmpty(data.company)) {
        errors.company = "公司不能为空！"
    }
    if (Validator.isEmpty(data.from)) {
        errors.from = "起始时间不能为空！"
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}