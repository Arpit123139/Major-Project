const complaint=require('../models/complaint')
const BigPromise=require('../middlewares/bigPromise')


exports.addcomplaint=BigPromise(async(req,res,next)=>{

    console.log("Enter the route")
    const {description}=req.body
    
    const result=await complaint.create({
        user:req.user._id,
        description:description
    })

    res.status("200").json({
        result
    })
})

exports.getcomplaint=BigPromise(async(req,res,next)=>{

    const user=req.user._id
    const result=await complaint.find({user})

    res.status("200").json({
        result
    })
})