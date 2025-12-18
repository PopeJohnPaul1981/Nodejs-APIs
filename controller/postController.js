const Post = require('../models/postModel')


// Create Post to the database
exports.createPost = async(req,res)=>{
    // have an instance of the post object
const post = new Post({
    title: req.body.title,
    description: req.body.description,
})

try {
    // call the save method on the new instance of the post
    const newPost = await post.save()
    // checking if newPost has value, if not return error 
    if(!newPost){
        return res.status(404).json({sucess:false,message:"No post found"})
    }
    // if newPost has value, send it to the user
    res.json({newPost})
} catch (error) {
    res.send(error.message)
}
}

// Fetching all the posts
exports.getPosts = async(req,res)=>{
    try {

        const posts = await Post.find()
        res.status(200).json({posts})
    } catch (error) {
        res.send(error.message)
    }
}

// Fetch A single product
exports.getOne = async(req,res)=>{
    const {id} = req.params
    try {
        const post = await Post.findById(id)
        if(!post){
            res.status(404).json({success:false,message:"Post not found"})
        }
        res.send(post)
    } catch (error) {
        res.send(error.message)
    }
}

// update post
exports.updatePost = async(req, res)=>{
    const {id}=req.params

    const post = {
    title: req.body.title,
    description: req.body.description,
}
    try {
        const updated = await Post.findByIdAndUpdate(id,post)
        if(!updated){
             res.status(404).json({success:false,message:"Post not found"})
        }
        res.status(201).json({success:true,updated})
    } catch (error) {
        
    }
}

// delete post
exports.deletePost = async(req,res)=>{
    const {id} = req.params
    try {
        await Post.findByIdAndDelete(id)
        res.send("Post deleted successfully")
    } catch (error) {
        res.send(error.message)
    }
}