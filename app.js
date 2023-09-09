const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/contacts");
const authRouter = require("./routes/auth");

const app = express()

const isDev = process.env.NODE_ENV === 'development';

if (isDev) app.use(logger('dev'));

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter)
app.use('/contacts', contactsRouter)

app.use((req, res) => {
    res.status(404).json({message: "Not found"})
})

app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({message: message});
});

module.exports = app