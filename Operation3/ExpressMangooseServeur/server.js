require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors');
    //dbProofOfLess
mongoose.connect(`mongodb+srv://ToolT:${process.env.USERDB}@cluster0.jmdq8nu.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader("Access-Control-Allow-Credentials", "true");


    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'content-type'); //'X-Requested-With,content-type'

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const usersRouter = require('./routes/user')
app.use('/user', usersRouter)

const twitterRouter = require('./routes/twitter');
app.use('/twitter', twitterRouter)

const oauthTwitterRouter = require('./routes/twitter-oauth');
app.use('/oauth', oauthTwitterRouter)

const handleCycle = require('./access/twitterBot');
handleCycle();

// const pyranihaRouter = require('./routes/c_pyranihas')
// app.use('/dbpyraniha', pyranihaRouter)

app.listen("8080", () => console.log('Server Started on Port 8080'))


// getUserNameByID("JulienRnlt");