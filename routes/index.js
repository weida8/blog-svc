const express = require('express')

import {createBlog, getSubscribedBlogs} from '../collections/blog/model'

const router = express.Router()
 
router.post('/postBlog', (req, res) => {
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
    getSubscribedBlogs(req.body)
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
 
module.exports = router