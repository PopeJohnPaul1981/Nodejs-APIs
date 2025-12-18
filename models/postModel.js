const mongoose = require('mongoose')

const postModel = mongoose.Schema({
    title:{
        type:String,
        required:["Please add your title"]
    },
    description:{
        type:String,
        required:["Please add your description"]
    }
},{timestamps:true})

const Post = mongoose.model("Post",postModel)
module.exports = Post