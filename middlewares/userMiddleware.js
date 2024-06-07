
const jwt = require("jsonwebtoken")

const isToken = (req,res,next)=>{                              
    let token = req.cookies.token
    if(token){
        next()
    }else{
        res.render('user/home')
    }
}

const isUser= (req,res,next)=>{
   let token = req.cookies.token
   console.log(token)
   if(token){
    jwt.verify(token,process.env.SECRET_KEY,(err,decode)=>{
        if(err){
           res.status('401')
           res.redirect('/login')
        }else{
           req.user = decode
           next()
        }
      })
   }else{
    res.redirect('/login');
   }
 
}

const isNotToken=(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        res.redirect('/')
    }else{
        next()
    }
}




module.exports = {
    isUser,
    isToken,
    isNotToken
}