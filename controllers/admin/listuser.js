const User = require("../../models/userSchema")


const listUsers = (req,res)=>{
    res.render("admin/listusers")
}



module.exports ={
    listUsers
}