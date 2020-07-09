import mongoose from 'mongoose'

const Schema = mongoose.Schema;

export const BlogSchema = new Schema({
    title: String,
    authorId: String,
    location: String,
    summary: String,
    date: Date,
    comments: [{
        author: String,
        comment: String,
        date: Date
    }]
})