const express = require('express')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const router = express.Router()

// 引入Post模型
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')

// 引入验证
const validatePostInput = require('../../validation/post')

/**
 * $route 
 * GET: api/posts/test
 */
router.get('/test', (req, res) => {
    res.json({ msg: "posts works" })
})


/**
 * $route 
 * POST: api/posts
 * @desc 创建一个留言
 * @access private
 */
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    })
    newPost.save()
        .then(post => res.json(post))
        .catch(err => res.status(404).json(err))
})

/**
 * $route 
 * GET: api/posts
 * @desc 获取所有留言信息
 * @access public
 */
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ noPostFound: "找不到任何评论信息！" }))
})

/**
 * $route 
 * GET: api/posts/:id
 * @desc 获取单个留言信息
 * @access public
 */
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(404).json({ noPostFound: "找不到该评论信息！" }))
})

/**
 * $route 
 * DELETE: api/posts/:id
 * @desc 删除单个留言信息
 * @access private
 */
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // 判断是否是本人
                    if (post.user.toString() !== req.user.id) {
                        return res.status(401).json({ noAuthorized: "非法操作！" })
                    }
                    post.remove()
                        .then(() => res.json({ success: true }))
                })
                .catch(err => res.status(404).json({ postNotFound: "没有找到该评论信息！" }))
        }).catch(err => res.status(404).json({ userNotFound: "用户信息未找到!" }))
})

/**
 * $route 
 * POST: api/posts/like/:id
 * @desc 点赞
 * @access private
 */
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() == req.user.id).length > 0) return res.status(400).json({ alreadyLike: "该用户已点赞！" })
                    post.likes.unshift({ user: req.user.id })
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ likeError: "点赞出错！" }))
        })
        .catch(err => res.status(404).json({ noUserInfo: "您还没有录入个人信息，不能点赞！" }))
})

/**
 * $route 
 * POST: api/posts/unlike/:id
 * @desc 删除点赞
 * @access private
 */
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if (post.likes.filter(like => like.user.toString() == req.user.id).length == 0) {
                        return res.status(400).json({ notLiked: "该评论还没有赞！" })
                    }
                    // 获取到要删掉的用户index
                    const removeIndex = post.likes.map(item => item.user.toString()).indexOf(req.user.id)
                    if (removeIndex == -1) {
                        return res.status(400).json({ notLiked: "您还未点赞！" })
                    }
                    post.likes.splice(removeIndex, 1)
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postNotFound: "评论未找到！" }))
        })
        .catch(err => res.status(404).json({ noUserInfo: "您还没有录入个人信息，不能操作！" }))
})

/**
 * $route 
 * POST: api/posts/comment/:id
 * @desc 添加评论接口
 * @access private
 */
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    const newComment = {
                        text: req.body.text,
                        name: req.body.name,
                        avatar: req.body.avatar,
                        user: req.user.id
                    }
                    post.comments.unshift(newComment)
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postNotFound: "评论未找到！" }))
        })
        .catch(err => res.status(404).json({ noUserInfo: "您还没有录入个人信息，不能进行评论操作！" }))
})

/**
 * $route 
 * POST: api/posts/comment/:post_id/:comment_id
 * @desc 删除评论接口
 * @access private
 */
router.delete('/comment/:post_id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.post_id)
                .then(post => {
                    if (post.comments.filter(comment => comment.id.toString() === req.params.comment_id).length == 0) {
                        return res.status(400).json({ commentNotExists: "该评论不存在！" })
                    }
                    // 获取到要删掉的评论index
                    const removeIndex = post.comments.map(item => item.id.toString()).indexOf(req.params.comment_id)
                    post.comments.splice(removeIndex, 1)
                    post.save()
                        .then(post => res.json(post))
                })
                .catch(err => res.status(404).json({ postNotFound: "评论未找到！" }))
        })
        .catch(err => res.status(404).json({ noUserInfo: "您还没有录入个人信息，不能进行评论操作！" }))
})

module.exports = router