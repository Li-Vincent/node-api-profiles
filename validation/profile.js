const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data) {
    data.handle = !isEmpty(data.handle) ? data.handle : ""
    data.status = !isEmpty(data.status) ? data.status : ""
    data.skills = !isEmpty(data.skills) ? data.skills : ""
    data.website = !isEmpty(data.website) ? data.website : ""
    let errors = {};

    if (Validator.isEmpty(data.handle)) {
        errors.handle = "handle不能为空！"
    } else if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
        errors.handle = "用户名的长度不能小于2位或大于40位！"
    }
    if (Validator.isEmpty(data.status)) {
        errors.status = "职位不能为空！"
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "技能不能为空！"
    }
    if (!Validator.isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "WebsiteURL不合法！"
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}