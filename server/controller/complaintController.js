const complaint=require('../models/complaint')
const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.addcomplaint=BigPromise(async(req,res,next)=>{

    console.log("Enter the route")
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    console.log("Enter the route")
    const user=await User.findById(decode.id);
    const {description}=req.body
    const result=await complaint.create({
        user:user._id,
        description:description
    })

    res.status(200).json({
        result
    })
})

exports.getcomplaint=BigPromise(async(req,res,next)=>{
    console.log("Enter the route")
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    console.log("Enter the route")
    const user=await User.findById(decode.id);
    id=user._id
    const result=await complaint.find({user:id})
    console.log(result)
    res.status(200).json({
        result
    })
})