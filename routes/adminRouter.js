const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin/adminController")
const adminMiddlewares = require("../middlewares/adminAuth")
const productController = require("../controllers/admin/productController")


router.get("/",adminMiddlewares.isToken,adminController.getAdmin)
router.get("/login",adminMiddlewares.isNotToken,adminController.getAdminLogin)
router.post("/login",adminController.validateLogin)
router.get("/users",adminController.getUser)

router.get("/otp",adminController.getAdminOtp)
router.get("/otplogin",adminController.getAdminOtpEmail)

router.get('/bolckedusers',adminController.getBlockedUser)
router.post('/blockuser',adminController.blockuser)
router.post('/unblockuser',adminController.unBlockUser)






module.exports = router