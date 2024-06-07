const express = require('express') ;
const userController = require('../controllers/user/userController') ;
const router = express.Router();
const userMiddleware = require("../middlewares/userMiddleware")





router.get("/",userMiddleware.isToken,userMiddleware.isUser,userController.getHome)
router.get("/login",userMiddleware.isNotToken,userController.getLogin)
router.get("/register",userMiddleware.isNotToken,userController.getRegister)

router.get("/otp",userMiddleware.isNotToken,userController.getOTP)
router.post("/register",userController.register)
router.post("/verifyOTP",userController.verifyOTP)
router.post("/login",userController.userLogin)
router.get("/resendOTP",userController.resendOtp,userController.getOTP)
router.get("/otplogin",userController.otpLogin)
router.post("/otplogin",userController.checkOTPEmail)



module.exports = router