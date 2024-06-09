const Category = require('../../models/categoryShema')

//get Category

const getCategory = async(req, res) => {
    let categories = await Category.find({isDeleted:false})
    res.render('admin/category',{categories:categories});
}

const getAddCategory = (req,res)=>{
    res.render("admin/addcategory")
}


// Sample in-memory product list (replace with your database model)
let products = [
    { id: 1, name: 'Product 1', price: 100, category: 'Business formal' },
    { id: 2, name: 'Product 2', price: 150, category: 'Black tie' },
    { id: 3, name: 'Product 3', price: 200, category: 'Cocktail' }
];

// Utility function to generate a new product ID
const getNextId = () => products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;



//get Product
const getProducts = (req,res)=>{
    res.render("admin/products",{products})
}

const addProduct = (req, res) => {
    const { name, price, category } = req.body;
    const newProduct = {
        id: getNextId(),
        name,
        price: parseFloat(price),
        category
    };
    products.push(newProduct);
    res.redirect('/');
};



// // GET  Show edit form
// const getEdit = (req, res) => {
//     const product = products.find(p => p.id === parseInt(req.params.id));
//     if (!product) {
//         return res.status(404).send('Product not found');
//     }
//     res.render('admin/edit-product', { product });
// }



// POST  - Update product
const updateProduct = (req, res) => {
    const { name, price, category } = req.body;
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (product) {
        product.name = name;
        product.price = parseFloat(price);
        product.category = category;
        res.json({ success: true });
    }
    res.redirect('/admin/products');
}


// POST - Delete product
const deleteProduct = (req, res) => {
    console.log(`Deleting product with ID: ${req.params.id}`);
    products = products.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/products');
}




// const addnewcategory =async (req,res)=>{
//     let category = req.body.category
//     if(category){
//         let newcategory = await Category.create({
//             categoryName:category,
//             isDeleted:false
//         })
//         console.log(newcategory)
//         res.redirect('products/category')
//     }
   
// }

//add new category

const addnewcategory =async (req,res)=>{
    let category = req.body.category
    console.log(category);
    let isExist = await Category.findOne({categoryName:category})
   
    if(isExist){
        res.render('admin/addcategory',{err:"entered category is already exist"})
    }else{
        let newcategory = await Category.create({
            categoryName:category,
            isDeleted:false
        })
        console.log(newcategory)
        res.redirect('/products/category')
    }
   
}





//delete category

const deletecategory = async(req,res)=>{
    let catId = req.query.catId
    console.log(catId);


    if(catId){
        let deletecat = await Category.findOneAndUpdate(
            {_id:catId},
            {
                $set:{
                    isDeleted:true
                }
            }
        )
        if(deletecat){
            res.status(200).send("category deleted successfully")
        }
    }
}


//restore category

const restoreCat = async(req,res)=>{
    let catId = req.query.catId

    if(catId){
        let restorecat = await Category.findOneAndUpdate(
            {_id:catId},
            {
                $set:{
                    isDeleted:false
                }
            }
        )

        if(restorecat){
            res.status(200).send("category deleted successfully")
        }
    }
}


//get edit category
const getEditcat =async (req,res)=>{
    let catId = req.params.categoryId
    let category = await Category.findOne({_id:catId})
    res.render('admin/editcategory',{category:category})
}

const getDeletedCategory =  (req,res)=>{
    res.render("admin/deletedcategories")
}



//get deleted categries
const getDeletedCategories =async (req,res)=>{
    let delCat = await Category.find({isDeleted:true});
    res.render('admin/deletedcategories',{category:delCat})
}



//edit category

const editCat =async (req,res)=>{
    let catId = req.params.catId
    let catName = req.body.category
    console.log(catName)

    let alreadyExist = await Category.findOne({categoryName:catName})
    
    if(alreadyExist){
        res.render('admin/editcategory',{err:"entered category already exist"})
    }else{
        let category = await Category.findOneAndUpdate(
            {_id:catId},
            {
                $set:{
                    categoryName:catName
                }
            }
        )
        console.log(category)
        res.redirect('/products/category')
    }

}


module.exports = {
    getCategory,
    addnewcategory,
    getAddCategory,
    deletecategory,
    restoreCat,
    getEditcat,
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getDeletedCategory,
    getDeletedCategories,
    editCat
}