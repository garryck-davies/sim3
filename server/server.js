require('dotenv').config();
const express = require('express');
const session = require('express-session');
const controller = require('./controller');
const massive = require('massive');
const bcrypt = require('bcryptjs');

//initialize express app
const app = express();

//destructure from .env
let { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env;

//connect to DB
massive(CONNECTION_STRING).then(db => app.set('db', db))

//middleware
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

//endpoints
app.post('/api/user-data', controller.userData)
app.post('/auth/register', controller.register)
app.post('/auth/login', controller.login)
//listen on port
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})