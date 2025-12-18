const fs = require('fs')
const Product = require('../models/productModel')
const path = require('path')

// Create Image 
exports.createProduct = async(req,res)=>{
    const {title,description,price,image} = req.body
    const imageName = req.file.filename
    const newProduct = new Product({
        title:title,
        description:description,
        price:price,
        image:imageName
    })

    try {
        const product = await newProduct.save()
        if(!product){
            res.status(404).json({success:false,message:'Could not create product at this time'})
        }
        res.status(201).json({product})
    } catch (error) {
        res.status(500).json({message:`Server error: ${error.message}`})
    }
}

// Fetch all images
exports.getProducts = async(req,res)=>{
    try {
        const products =await Product.find()
        if(!products){
            res.status(404).json({mesage:'Products not found'})
        }
        res.status(200).json({products})
    } catch (error) {
        res.send(error.message)
    }
}
// Fetch a single product
exports.getSingle = async(req,res)=>{
    const {id} = req.params
    
    try {
       const product = await Product.findById(id)
       if(!product){
        res.status(404).json({mesage:'Product not found'})
        }
        res.status(200).json({product})
    } catch (error) {
        res.send(error.message)
    }
}

// Update Product
exports.updateProduct = async(req,res)=>{
    const {id} = req.params
    const {title,description,price,image} = req.body
    try {
        // Getting image from the db based on id
        const product = await Product.findById(id)
        if(!product){
            res.status(404).json({message:'No product found'})
        }
        // deleting product image from the server i.e 'upload' folder
        if(product.image){
            const imagePath = path.join(__dirname,'../upload',product.image);
            // console.log(imagePath)
            fs.unlink(imagePath,(err)=>{
                if(err){
                    res.send('We could not delete Image, something went wrong')
                }
                res.send('Product image deleted successfully!')
            })
        }
        const newImg = req.file.filename
        // data base update
        const prod = {
            title:title,
            description:description,
            price:price,
            image:newImg
        }
        const newProduct = await Product.findByIdAndUpdate(id,prod)
        if(!newProduct){
            res.status(400).json({message:'We could not create at this time'})
        }
        res.status(200).json({newProduct})
    } catch (error) {
        res.send(error.message)
    }
}

// Delete product
exports.deleteProduct = async(req,res)=>{
    // get id from url
    const {id} = req.params
    // getting the image to be deleted 
    const item = await Product.findById(id)
    // get the image path and delete
    if(item.image){
        const imageUrl = path.join(__dirname,'../upload',item.image)
        fs.unlink(imageUrl,(err)=>{
            if(err){
                res.send("We could not delete image, something went wrong")
            }
            // res.send("Image deleted")
        })
    }
    // Delete image from the database
    try {
        await Product.findByIdAndDelete(id)
        res.send("Product deleted successfully!")
    } catch (error) {
        res.status.json({message:'Server error'})
    }

}