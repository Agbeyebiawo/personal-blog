const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        required: false,
        default:"Hi there, I'm new on LiteBlog"
    }
},{timestamps: true})

module.exports = mongoose.model('User',UserSchema)