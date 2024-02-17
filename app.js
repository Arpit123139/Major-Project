const express=require('express')
const app=express()
require('dotenv').config()
// const morgan = require('morgan')
// const cookieParser=require('cookie-parser')
// const fileUpload=require('express-fileupload')


const user=require('./Routes/user')

//reguglar miidelware
app.use(express.json())                             // To handle the json
app.use(express.urlencoded({extended:true}))        //to handle something comming in the body

//test route
app.use("/api/v1",user)

app.get('/test',(req,res)=>{
    res.send("SUCCESS")
})


//export app.js
module.exports=app;
