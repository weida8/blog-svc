const mongoose = require('mongoose')
import {BlogSchema} from './schema'

const Blogs = mongoose.model('Blogs', BlogSchema)

export const createBlog = async (reqBody) => {
    const createBlog  = await Blogs.create(reqBody)
    return createBlog 
}

export const getSubscribedBlogs = (reqBody) => {
    const getBlog = Blogs.find({author: {$in: ['Wei Da Pan', 'Saad Mecci']}})
    return getBlog;
}