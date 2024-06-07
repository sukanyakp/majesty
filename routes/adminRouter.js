const express = require("express")
const router = express.Router()
const adminController = require("../controllers/admin/adminController")
const category = require("../controllers/admin/category")
const adminMiddlewares = require("../middlewares/adminAuth")


router.get("/",adminMiddlewares.isToken,adminController.getAdmin)
router.get("/login",adminMiddlewares.isNotToken,adminController.getAdminLogin)
router.post("/login",adminController.validateLogin)
router.get("/users",adminController.getUser)

router.get("/otp",adminController.getAdminOtp)
router.get("/otplogin",adminController.getAdminOtpEmail)



module.exports = router