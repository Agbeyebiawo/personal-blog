const Post = require('../models/posts')
const fs = require('fs')

const multer = require('multer')
const uploadMiddleware = multer({dest: 'upoads/'})

async function getPosts(req,res){
    try{
        const posts = await Post.find().populate('author', ['name'])
        .sort({createdAt: -1})
        if(!posts){
            return res.status(400).send('no blogs')
        }

        res.status(200).send(posts)
    }catch(err){
        console.log(err)
    }
}

async function getUserPost(req,res){
    try{
        const userPost = await Post.find({author:req.params.id})
        if(!userPost){
            return res.status(400).send('no blogs found')
        }

        res.status(200).send(userPost)
    }catch(err){
        console.log(err)
    }
}

async function createNewPost(req,res){
    try{
        const {originalName,path} = req.file
        const parts = originalName.split('.')
        const ext = parts[parts.length - 1]
        const newPath = path+'.'+ext;
        fs.renameSync(path,newPath)


        const {token} = req.cookies
        jwt.verify(token, secret, {}, async(err,info)=>{
            if(err) throw err;
            const {title,summary,content,author} = req.body
            const newPost = new Post({title,summary,cover:newPath,content,author})
            if(!newPost){
                return res.status(400).send('failed to create blog')
            }
            await newPost.save()

            res.status(200).json('ok')
        })
       

        // res.status(200).send('ok')
    }catch(err){
        console.log(err)
    }
}

async function deletePost(req,res){
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.status(400).send('failed to delete')
        }

        res.status(200).send(post)
    }catch(err){
        console.log(err)
    }
}

async function updatePost(req,res){
    try{
        const {title,summary,content,author} = req.body
        const post = await Post.findByIdAndUpdate(req.params.id,{
            title:title,summary:summary,content:content,author:author
        })

        if(!post){
            return res.status(400).send('failed to update')
        }
        await post.save()
        res.status(200).send('ok')
    }catch(err){
        return res.status(400).send(err.message)
    }
}

module.exports = {
    getPosts, getUserPost, createNewPost, deletePost, updatePost
}