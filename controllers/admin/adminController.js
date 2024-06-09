const jwt = require("jsonwebtoken")
const User = require("../../models/userSchema")
const bcrypt = require("bcrypt")



const getAdmin = (req,res)=>{
    res.render("admin/adminDash")
}

const getAdminLogin = (req,res)=>{
    res.render("admin/adminLogin")
}

const getAdminOtp =(req,res)=>{
    res.render("admin/adminOtp")
}

const getAdminOtpEmail = (req,res) =>{
    res.render("admin/adminOtpEmail")
}


//generate Token
function generateToken(payload) {
    return jwt.sign(payload, process.env.SECRET_KEY);
}

const getUser = async (req,res)=>{
    let user = await User.find({isListed : false} )


    res.render('admin/listusers',{users:user})
}



//get Blocked users

const getBlockedUser = async (req,res)=>{
    let user = await User.find({isListed : true} )
    res.render('admin/blockedusers',{users:user})
}







//validate admin login 

const validateLogin = async (req,res)=>{
    // try{
        const {email,password} = req.body
        console.log(req.body);

        const user = await User.findOne({email:email})

        if(user){
            const isPassword = await bcrypt.compare(password,user.password)
            console.log(isPassword);
            if(isPassword ){
                if(user.isAdmin== true){
                    const payload = {
                        name:user.name
                    }
                    const token = generateToken(payload)
                    console.log(token);
                    res.cookie("admintoken", token, {
                        maxAge: 24 * 60 * 60 * 1000,
                        httpOnly: true
                    });
                    res.redirect('/admin')

                }else{
                    throw new Error("invalid password")
                
            }
        }else{
            throw new Error("invalid email")
    }
// }
//     }catch (err) {
//         console.log(err)
//         res.render('admin/adminlogin', { err: "invalid email and password" })
//     }
}
}


// //  function to generate OTP
// const createOTP = ()=>{
//     return(crypto.randomBytes(3).readUIntBE(0,3) % 1000000).toString().padStart(6,"0")
// }

// // function to generate Token
// const generateToken = (payload)=>{
//     return jwt.sign(payload,process.env.SECRET_KEY)
// }



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








//block user

const blockuser = async(req,res)=>{
    let userId = req.query.userId;
console.log(`id is ${userId}`)
    let user = await User.updateOne(
        {_id:userId},
        {
            $set:{
                isListed:true
            }
         }
    )
    if(user){
        res.status(200).send("user blocked successfully")
    }
}

// unblock user

const unBlockUser = async (req,res)=>{
    let userId = req.query.userId;
    console.log(`id is ${userId}`);
    let user = await User.updateOne(
        {_id:userId},
        {
            $set:{
                isListed:false
            }
        }
    )
    if(user){
        res.status(200).send("user unblocked  successfully")
    }
}








module.exports ={
    getAdmin,
    getAdminLogin,
    getAdminOtp,
    getAdminOtpEmail,
    validateLogin,
    getUser,
    // createOTP,
    // generateToken
    getBlockedUser,
    blockuser,
    unBlockUser,
  
  

    

}