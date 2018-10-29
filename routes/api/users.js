const express = require('express')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()

// 引入User模型
const User = require('../../models/User')

// 引入验证
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

const secretOrKey = require('../../config/keys').secretOrKey

// login & register
/**
 * $route 
 * POST: api/users/login
 * @desc 返回token jwt passport
 * @access public
 */
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const { errors, isValid } = validateLoginInput(req.body)
    // 判断isValid是否通过
    if (!isValid) {
        return res.status(400).json(errors)
    }

    // 查询数据库
    User.findOne({ email })
        .then((user) => {
            if (!user) return res.status(400).json({ email: "用户不存在！" })
            bcrypt.compare(req.body.password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        // 使用token
                        // jwt.sign("规则", "加密名字", "过期时间", "箭头函数")
                        jwt.sign(rule, secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err;
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // res.json({ msg: "success" })
                    } else {
                        return res.status(400).json({ password: "密码错误！" })
                    }
                })
        })
})

/**
 * $route 
 * POST: api/users/register
 * @desc 返回user
 * @access public
 */
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)
    // 判断isValid是否通过
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email })
        .then((user) => {
            // 查询数据库中是否已经拥有该邮箱
            if (user) {
                return res.status(400).json({ email: "邮箱已被注册！" })
            } else {
                // 获取头像
                const avatar = gravatar.url(req.body.email, { s: '200', r: 'pg', d: 'mm' })
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar: avatar,
                    password: req.body.password
                })
                // 密码加密后存储到DB
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        newUser.password = hash
                        newUser.save()
                            .then((user) => {
                                res.json(user)
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    })
                })
            }
        })
})

/**
 * $route GET api/users/current
 * POST: api/users/login
 * @desc return current user
 * @access private
 */
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router