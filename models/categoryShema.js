const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('category',categorySchema)