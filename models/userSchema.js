const mongoose = require("mongoose") 

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    phone:{
        type:String,
        required:false
    },
    image:{
        type:String,
        
    },
    password:{
        type:String,
        required:false
    },
    OTPVerification:{
        type: Boolean,
        required: false,
        default: false
    },
    isListed:{
        type:Boolean,
        required:false,
        default: false
    },
    isAdmin :{
        type:Boolean,
        required:false,
        default:false
    },
    jointDate:{
        type:String,
        required:true,
        default:false
    }
})

module.exports = mongoose.model("user",userSchema)  