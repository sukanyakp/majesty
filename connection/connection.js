const mongoose = require('mongoose');

let connection =()=>{
    try {

        mongoose.connect("mongodb+srv://sukanyakp04:C3Udu7EsY9kl07iT@cluster0.nlfrqad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Majesty")
        console.log("mongodb connected successfully...");
        
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    connection
}