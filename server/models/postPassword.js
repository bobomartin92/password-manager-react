import mongoose from 'mongoose'

const userPassSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    passwords: {
        type: []
    }
})

const userPass = mongoose.model('UserPassword', userPassSchema)

export default userPass