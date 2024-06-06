const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    summary:{
        type: String,
        required: true
    },
    cover:{
        type: String,
        required: false,
        default: "https://cdn.pixabay.com/photo/2023/09/02/03/15/water-8228076_1280.jpg"
    },
    content:{
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId, ref:'User'
    }
},{timestamps: true})

module.exports = mongoose.model('Post',PostSchema)