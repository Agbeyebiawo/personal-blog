const express = require('express')
const router = express.Router()
const {register,login,getAuthors,profile,logout} = require('../controllers/user')

router.post('/register',register)
router.post('/login',login)
router.get('/authors',getAuthors)
router.get('/profile',profile)
router.post('/logout',logout)

module.exports = router