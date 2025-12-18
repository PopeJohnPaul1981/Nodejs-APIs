const multer = require('multer')
const express = require('express')
const { createProduct, getProducts, getSingle, updateProduct, deleteProduct } 
= require('../controller/productController')


const router = express.Router()

const storage = multer.diskStorage({
    destination:'upload',
    filename:(req,file,cb)=>{
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post('/api/products',upload.single('image'), createProduct)
router.get('/api/products',getProducts)
router.get('/api/products/:id',getSingle)
router.put('/api/products/:id',upload.single('image'),updateProduct)
router.delete('/api/products/:id',deleteProduct)

module.exports = router


