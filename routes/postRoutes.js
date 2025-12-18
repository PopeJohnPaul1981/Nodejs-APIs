const express = require('express')
const { createPost, getPosts, getOne, updatePost, deletePost } = require('../controller/postController')


const router = express.Router()


router.post('/api/posts',createPost)
router.get('/api/posts',getPosts)
router.get('/api/posts/:id',getOne)
router.put('/api/posts/:id',updatePost)
router.delete('/api/posts/:id',deletePost)

module.exports = router

