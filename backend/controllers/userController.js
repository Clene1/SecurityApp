const User = require('../models/userModels.js')
const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')

const createToken = (_id) => {
    return
    jwt.sign({_id}, process.env.SECRET_KEY, {expiresIn: '3d'})
}


//login user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)

        //after signup, but jyst before response from server
        const token = createToken(user._id)

        //store token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 1000, //days, hours, minutes, seconds, milliseconds
            sameSite: 'Lax',
        })
        res.status(200).json({email})
    }
    catch(error){
        res.status(400).json({error: error.message})   //we use this bc it can be our error in  error in userModel, or any other error by Mongoose
    }
}

//signup user
const signupUser = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.signup(email, password)

        //after signup, but jyst before response from server
        const token = createToken(user._id)

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3 * 24 * 60 * 1000, //days, hours, minutes, seconds, milliseconds
            sameSite: 'Strict',
        })

        res.status(200).json({email})
    }
    catch (error) {
        res.status(400).json({error: error.message})  //we use this bc it can be our error in userModel, or any other error bu Mongoose
    }
}

const logoutUser = async (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),  //international standard for a date in the past
        //sameSite: 'Strict',
    })
    res.status(200).json({message: 'Logged out successfully'});
}

module.exports = {
    loginUser,
    signupUser,
    logoutUser
}