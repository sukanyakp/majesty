const User = require("../../models/userSchema")




const getCategory = (req, res) => {
    res.render('admin/category');
}

module.exports = {
    getCategory
}