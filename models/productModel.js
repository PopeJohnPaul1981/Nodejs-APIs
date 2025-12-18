const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:['Product title is required']
    },
    description:{
        type:String,
         required:['Product descriptin is required']
    },
    price:{
        type:Number,
         required:['Product price is required']
    },
    image:{
        type:String,
         required:['Product image name is required']
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema)
module.exports = Product