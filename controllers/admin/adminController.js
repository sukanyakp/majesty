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
// const generateOTP = ()=>{
//     return(crypto.randomBytes(3).readUIntBE(0,3) % 1000000).toString().padStart(6,"0")
// }

// // function to generate Token
// const generateToken = (payload)=>{
//     return jwt.sign(payload,process.env.SECRET_KEY)
// }





module.exports ={
    getAdmin,
    getAdminLogin,
    getAdminOtp,
    getAdminOtpEmail,
    validateLogin,
    getUser
    // generateOTP,
    // generateToken

}