const express = require('express')
const router = express.Router()
const {getPosts, getUserPost, createNewPost, deletePost,updatePost} = require('../controllers/post')


// router.param('',uploadMiddleware.single('file'))
router.get('/posts',getPosts)
router.get('/posts/:id',getUserPost)
router.post('/newpost', 
    // uploadMiddleware.single('file'),
     createNewPost)
router.put('/updatepost/:id', 
    // uploadMiddleware.single('file'), 
updatePost)
router.delete('/deletepost/:id',deletePost)

module.exports = router