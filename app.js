const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
// const Post1 = require('./models/postModel')
const postRouter = require('./routes/postRoutes')
const ProdctRouter = require('./routes/productRoute')


const app = express()


connectDB()



// middlewares
app.use(express.json())// helps us to receive json data into this app
app.use(express.urlencoded({extended:false}))
app.use('/',postRouter)
app.use('/',ProdctRouter)
app.get('/',(req,res)=>{
    res.send("Hello World")
})
// app.get('/win',async(req,res)=>{
//     const info = await Post1.find()
//     res.send(info)
// })
const port = process.env.PORT || 7000

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})