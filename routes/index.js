import express from 'express'
import {isAuthenticated} from '../util/isAuthenticated'
import {createBlog, getSubscribedBlogs, getBlogs} from '../collections/blog/model'
import {createUser, loginUser} from '../collections/user/model'

const router = express.Router()
 
router.post('/postBlog', (req, res, next) => isAuthenticated(req, res, next), (req, res) => {
    createBlog(req.body)
        .then((response) => {
            res.json({
                status: 200,
                data: response
            })
        })
        .catch((err) => {
            throw err
        })    
})

router.get('/getBlogs', (req, res) => {
    getBlogs()
        .then(response => {
            res.json({
                status: 200,
                data: response
            })
        }).catch(err => {
            throw err
        })
})

router.get('/getSubscribedBlogs', (req, res, next) => isAuthenticated(req, res, next), (req, res) => {
    getSubscribedBlogs(req.body.subscribedAuthors)
        .then((response) => {
            res.json({
                status: 200,
                data: response
            })
        })
        .catch((err) => {
            throw err
        })
})

router.post('/register', (req, res) => {
    createUser(req.body)
        .then(response => {
            res.json({
                status: 200,
                data: response
            })
        })
        .catch(err => {
            res.json({
                status: 400,
                error: err.message
            })
        })
})

router.post('/login', (req, res) => {
    loginUser(req.body)
        .then(response => {
            res.json({
                status:200,
                data: response
            })
        })
        .catch(err => {
            res.status(400).json({
                status: 400,
                error: err.message
            })
        })
})

module.exports = router