const express = require("express")
const router = express.Router()
const productController = require('../controllers/admin/productController')
const userMiddleware = require("../middlewares/userMiddleware")

router.get('/',productController.getProducts);
router.get("/addcategory",productController.getAddCategory)
router.get("/category",productController.getCategory)
router.post("/category",productController.addnewcategory)
router.get("/deletecategory:id",productController.deletecategory)
router.post("/deletecategory",productController.deletecategory)
router.post('/restorecategory',productController.restoreCat)
router.post("/",productController.addProduct)
router.post('/products/edit/:id',productController.updateProduct)
router.post('/products/delete/:id',productController.deleteProduct)

router.get("/deletedcategories",productController.getDeletedCategories)
router.post("/addnewcategory",productController.addnewcategory)

router.get('/editcategory/:categoryId',productController.getEditcat)

router.post('/editcategory/:catId',productController.editCat)



module.exports = router