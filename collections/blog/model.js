import mongoose from 'mongoose' 
import {BlogSchema} from './schema'

const Blogs = mongoose.model('Blogs', BlogSchema)

export const createBlog = async (reqBody) => {
    const createBlog  = await Blogs.create(reqBody)
    return createBlog 
}

export const getSubscribedBlogs = (reqBody) => {
    const getSubedBlogs = Blogs.find({author: {$in: reqBody}})
    return getSubedBlogs
}

export const getBlogs = (reqBody) => {
    const getBlog = Blogs.find({}, null, {limit: 10})
    return getBlog
}