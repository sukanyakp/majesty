const express = require('express');
const app = express();
const path = require('path');
const nocache = require('nocache');
const session = require('express-session');
const userRouter = require('./routes/userRouter.js');
const adminRouter = require("./routes/adminRouter.js")
const connection = require('./connection/connection.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require("cookie-parser")

dotenv.config();

connection.connection()

app.set("view engine","ejs")

app.use(express.json());
app.use(express.static("public"));
app.use(nocache());
app.use(express.urlencoded({extended:true}))

app.use(session({
    secret:process.env.sessionSecret,
    resave:false,
    saveUninitialized:true,
    cookie: { secure: false } // Set secure: true if using HTTPS
}))
app.use(cookieParser())

app.use("/",userRouter);

app.use("/admin",adminRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace
    res.status(500).render('error', { error: err.message }); // Render an error page with the error message
});
app.listen(3001,()=>{
    console.log("server is running..");
})



