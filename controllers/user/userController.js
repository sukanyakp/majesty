const bcrypt = require('bcrypt');
const User = require('../../models/userSchema')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require('crypto');
const axios = require('axios')

let OTP
let registerdEmail


// Function to generate a random OTP
const generateOTP = () => {
    return (crypto.randomBytes(3).readUIntBE(0, 3) % 1000000).toString().padStart(6, '0');
}

//function for generate token

function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY);
}



// Function to send OTP via email
const sendOTP = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your OTP for Registration',
            text: `Your OTP is ${otp}`
        };
        console.log("otp", otp);

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error occurred:", error);
        throw new Error("Failed to send email");
    }
};

const tempOTPStore = {}; // In-memory store for OTPs, use Redis or database in production



// register

const register = async (req, res) => {
    console.log(req.body)
    const { name, email, phone, password } = req.body


    // check if email already exists
    // let emailAlReadyExist = false
    let user = await User.findOne({ email: email });
    registerdEmail = email;

    if(user){
        console.log("email already exist")
        return res.render('user/register', { errE: "entered Email is already exist" })
    }

        let hashedPasword = await bcrypt.hash(password, 10)

        let date = new Date();
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
         let localdate = date.toLocaleDateString('en-GB', options);

        const newUser = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPasword,

        })
        console.log(newUser)

        if (newUser) {
            OTP = generateOTP();
            sendOTP(registerdEmail, OTP);
            res.redirect('/otp')
        }


}


const verifyOTP = async (req, res) => {
    try {

        console.log(req.query.data);
        console.log(` registrd email ${registerdEmail}`);

        if (OTP == req.query.data) {

            let user = await User.findOneAndUpdate(
                { email: registerdEmail },
                {
                    $set: {

                        OTPVerification: true
                    }
                });



            console.log(` registrd user is${user}`);
            const payload = {

                name: user.name

            };

            const token = generateToken(payload);

            res.cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            res.status(200).send("OTP verified successfully.")
        }




    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).send("Internal Server Error");
    }
}

//resend otp
const resendOtp = (req, res, next) => {
    OTP = generateOTP();
    sendOTP(registerdEmail, OTP);
    console.log("rsend otp",OTP);
    next();
}

// user login

const userLogin = async (req, res) => {
    const { email, password } = req.body


    let user = await User.findOne({ email: email });
    let checkPssword = await bcrypt.compare(password, user.password)
    console.log(user)

    if (user) {
        if (checkPssword) {
            const payload = {
                id: user._id,
                name: user.name
            }
            const token = generateToken(payload)
            console.log(token)
            res.cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            });

            res.redirect('/')
        } else {
            res.render('user/login', { err: "check entered Password is correct" })
        }
    } else {
        res.render('user/login', { err: "check entered Email address is correct" })
    }
}

//otp login
const otpLogin = (req,res)=>{
    res.render('user/otpemail')
}


const checkOTPEmail = async (req,res)=>{
    let email = req.body.email

    let user = await User.findOne({email:email})
    if(user){

        if(user.OTPVerification== true){

            registerdEmail = user.email
           OTP = generateOTP()
           sendOTP(registerdEmail,OTP);
           res.redirect("/otp")
        }else{
            res.render('user/otpEmail',{err:"invalid Email address"})
          
        }
    }else{
        res.render('user/otpEmail',{err:"invalid Email address"})
      
    }
}



//get home page
const getHome = async (req, res) => {
    res.render("user/home", { user: req.user })
}

//get user login
const getLogin = (req, res) => {
    res.render("user/login")
}



//get register
const getRegister = (req, res) => {
    res.render("user/register")
}

const getOTP = (req, res) => {

    res.render("user/verifyOtp")
}


const getEmail = (req, res) => {
    res.render("user/otpEmail")
}

module.exports = {
    getHome,
    getLogin,
    getRegister,
    getOTP,
    getEmail,
    register,
    verifyOTP,
    resendOtp,
    userLogin,
    sendOTP,
    otpLogin,
    checkOTPEmail

}