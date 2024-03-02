const feedback=require('../models/feedback')
const BigPromise=require('../middlewares/bigPromise')


exports.addfeedback=BigPromise(async(req,res,next)=>{

    console.log("Enter the route")
    const {rating,review}=req.body
    
    const result=await feedback.create({
        user:req.user._id,
        rating:rating,
        review:review
    })

    res.status("200").json({
        result
    })
})

exports.getfeedback=BigPromise(async(req,res,next)=>{

    const user=req.user._id
    const result=await feedback.find({user})

    res.status("200").json({
        result
    })
})

exports.test=BigPromise(async(req,res,next)=>{
    res.status('200').json({
        SUCCESS
    })
})