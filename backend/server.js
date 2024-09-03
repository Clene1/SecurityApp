//import to use .env file
require('dotenv').config()

// packages 
const express = require('express')
const mongoose = require('mongoose')
const https = require('https')
const path = require('path')
const fs = require('fs')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')

//imports
const bookRoutes = require('./routes/bookRouter')
const userRoutes = require('./routes/userRouter')

//creating express package
const app = express()

app.use('/api/books', bookRoutes)
app.use('/api/user', userRoutes)

//set up CSRF middleware
app.use(csrf({
    cookie:{
        httpOnly: true,
        secure: process.env.NODE_ENV ==='production',
        sameSite: 'Lax'
    }
}))

//we need to update our api to use CSRF token
app.get('/api/csrf-token', (req, res) => {
    res.json({ csrfTokekn: req.csrf()});
})

//middleware
app.use(express.json())
app.use(cookieParser())

//middleware to expose CSRF token in response
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfTokekn()
    console.log(req.path, req.method)
    next()
})

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        sslServer.listen(process.env.PORT, () => {
        console.log('Https server is now running on on port 3000') 
        })
    })
    .catch((error) => {
        console.log(error)
    })



