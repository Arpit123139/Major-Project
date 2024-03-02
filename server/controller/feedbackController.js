const feedback=require('../models/feedback')
const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.addfeedback=BigPromise(async(req,res,next)=>{
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    console.log("Enter the route")
    const {rating,review}=req.body
    const user=await User.findById(decode.id);
    const result=await feedback.create({
        user:user._id,
        rating:rating,
        review:review
    })
    console.log(result)


    res.status(200).json({
        result
    })
})

exports.getfeedback=BigPromise(async(req,res,next)=>{
    const token=req.params.token;
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    console.log("---------------------------------------\n=============\n")
    console.log("Enter the route")
    const {rating,review}=req.body
    const user=await User.findById(decode.id);
    id=user._id
    const result=await feedback.find({user:id})
    console.log(result)
    res.status(200).json({
        result
    })
})

exports.test=BigPromise(async(req,res,next)=>{
    res.status('200').json({
        SUCCESS
    })
})