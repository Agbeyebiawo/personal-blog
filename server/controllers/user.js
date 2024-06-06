const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = 'daf94eb2d231d075f6d7cb1c43be39c1'
const cookie = require('cookie-parser')

async function register(req,res){
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

async function login(req,res){
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
}

async function profile(req,res){
    try{
        const {token} = req.cookies
        jwt.verify(token,secret,{},(err,info)=>{
            if(err) throw err;
            res.status(200).json(info)
        })
    }catch(err){

    }
}

async function logout(req,res){
    try{
        res.cookie('token','').json('ok')
    }catch(err){

    }
}

async function getAuthors(req,res){
    try{
        const users = await User.find()
        if(!users){
            return res.status(400).send('no users')
        }

        res.status(200).send(users)
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports = {
    register,login,getAuthors,profile,logout
}