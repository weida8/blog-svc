import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    location: String
})