
const express = require('express')
const {loginUser, signupUser, logoutUser} = require('../controllers/userController')
//create instance of router
const router = express.Router()

//bruteforce attacks prevention
const ExpressBrute = require('express-brute')
const store = new ExpressBrute.MemoryStore();

const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    minWait: 1000 * 60, //1 minute wait after the login attemps
    maxWait: 1000 * 60 * 10, //10 mins max wait time
    lifetime: 1000 * 60 * 10, //10 mins  lifetime
});

//login
router.post('/login', bruteforce.prevent, loginUser)

//signup
router.post('/signup', signupUser)

//logout
router.post('/logout', logoutUser)

//export routes
module.exports = router