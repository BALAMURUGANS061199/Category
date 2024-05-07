const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT
const CategoryRoute = require("./view/Route")
const app = express() //Instance of Express

app.use(express.json());
app.use('/Api',CategoryRoute)
app.use('/',(req,res)=>{
    res.send('Hello Category API')
})

app.listen(PORT,()=>{
    console.log(`Running Server PORT ${PORT}`)
})

MongoURL = process.env.Mongo_URL
mongoose.connect(MongoURL,{
useNewUrlParser: true,
useUnifiedTopology : true
}).then(()=>{
    console.log("Connected MongoDB Atlas")
}).catch((error)=>{
    console.error('Error Connecting MongoDB Atlas',error)
})


// const router = require('express').Router();
// const Category =require('../model/Category')


// router.post('/Create',async (req,res)=>{
//     const {Category1,Category2,Category3} = req.body
//     try{
// const NewCategory = await Category.create(req.body);
// res.status(200).json({message:"Created Successfully",NewCategory})
//     }
//     catch(err){
//         console.log(err)
//     }
// })
// module.exports = router