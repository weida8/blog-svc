import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
import {sign} from '../../util/jwtServices'
import {UserSchema} from './schema'

const Users = mongoose.model('Users', UserSchema)

const getUser = async (userEmail) => { 
    const userPromise = await Users.findOne({email: userEmail})
    return userPromise
}

export const createUser = async (reqBody) => {
    const user = await getUser(reqBody.email)
    console.log('user:', user)
    if(user) {
        throw new Error("This username already exists!")
    }

    const hash = await bcrypt.hash(reqBody.password, 12);
    const userObj = {
        userName: reqBody.userName,
        email: reqBody.email,
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        password: hash
    }
    const createUser = await Users.create(userObj)
    return createUser
}

export const loginUser = async reqBody => {
    const user = await getUser(reqBody.userName)
    if(!user) {
        throw new Error('Username/Password incorrect. Please try again.')
    }
    console.log(user)
    const passwordMatch = await bcrypt.compare(reqBody.password, user.password)
    if(passwordMatch) {
        const token = sign(reqBody);   
        return {
                message: 'you are logged in!',
                token: token,
                firstName: user.firstName,
                lastName: user.lastName,
                userId: user._id
            }
        } else {
           throw new Error('Something went wrong with the authentication server') 
    }
}
