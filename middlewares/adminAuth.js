

const isToken = (req,res,next)=>{                              
    let token = req.cookies.token
    if(token){
        next()
    }else{
        res.redirect('/admin/login')
    }
}



const isNotToken=(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        res.redirect('/admin')
    }else{
        next()
    }
}

module.exports ={
    isToken,
    isNotToken
}