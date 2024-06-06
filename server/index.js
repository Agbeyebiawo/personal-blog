const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// const userRouter = require('./routes/user')
// const postRouter = require('./routes/post')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const cookieParse = require('cookie-parser')
const secret = 'asdaq545qtqadf35q449'

const Post = require('./models/posts')
const User = require('./models/user')

const fs = require('fs')

const multer = require('multer')
const uploadMiddleware = multer({dest: 'upoads/'})

const app = express()

mongoose.connect('mongodb://0.0.0.0:27017/blog').
then(()=>console.log('db started')).
catch(err=>console.log(err))

app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET","POST","PUT","DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParse())

app.post('/register',async(req,res)=>{
    try{
        const {name,email,password} = req.body
        const hashPassword = await bcrypt.hash(password,10)
        if(!hashPassword){
            return res.status(400).send('failed to hash password')
        }
        const newUser = new User({name,email,password})
        if(!newUser){
            return res.status(400).send('failed to create user')
        }
        
        await newUser.save()
        res.status(200).send('ok')
    }catch(err){
        console.log(err.message)
    }
}
)

app.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).send('User does not exist')
        }

        const comparePassword = bcrypt.compare(password, user.password)
        if(!comparePassword){
            return res.status(400).send('incorrect password')
        }
        jwt.sign({name:user.name,id:user.id}, secret, {}, (err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json({
                user:user,
                message:'ok'
            })
        })
 
        // res.status(200).send({user,message:'ok'})
    }catch(err){
        console.log(err.message)
    }
})

app.post('/logout',(req,res)=>{
    try{
        res.cookie('token','').json('ok')
    }catch(err){

    }
})

app.get('/profile',async(req,res)=>{
    try{
        const {token} = req.cookies
        jwt.verify(token,secret,{},(err,info)=>{
            if(err) throw err;
            res.status(200).json(info)
        })
    }catch(err){

    }
})

app.get('/posts',async(req,res)=>{
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
})

app.get('/posts/:id',async(req,res)=>{
    try{
        const userPost = await Post.find({author:req.params.id})
        if(!userPost){
            return res.status(400).send('no blogs found')
        }

        res.status(200).send(userPost)
    }catch(err){
        console.log(err)
    }
})

app.post('/newpost', uploadMiddleware.single('file'),async(req,res)=>{
    try{
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path+'.'+ext;
        fs.renameSync(path, newPath);
      

        const {token} = req.cookies
        
        const verifyToken = jwt.verify(token, secret)
        if(!verifyToken){
            return res.status(401).send('Unauthorized')
        }
        const {title,summary,content,author} = req.body
        const newPost = new Post({title,summary,cover:newPath,content,author})
        if(!newPost){
            return res.status(400).send('failed to create blog')
        }
        await newPost.save()

        res.status(200).json('ok')

        // jwt.verify(token, secret, {}, async(err,info)=>{
        //     if(err) throw err;
        //     const {title,summary,content,author} = req.body
        //     const newPost = new Post({title,summary,cover:newPath,content,author})
        //     if(!newPost){
        //         return res.status(400).send('failed to create blog')
        //     }
        //     await newPost.save()

        //     res.status(200).json('ok')
        // })
       

        // res.status(200).send('ok')
    }catch(err){
        console.log(err)
    }
})

app.put('/updatepost/:id', uploadMiddleware.single('file'),async(req,res)=>{
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
})

app.delete('/deletepost/:id',async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post){
            return res.status(400).send('failed to delete')
        }

        res.status(200).send(post)
    }catch(err){
        console.log(err)
    }
})

// app.use('',userRouter)
// app.use('',postRouter)

app.listen(4000,()=>console.log('server started'))