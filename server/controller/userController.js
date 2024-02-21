const User=require('../models/user')
const BigPromise=require('../middlewares/bigPromise')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


exports.signup=BigPromise(async(req,res,next)=>{

    const {name,email,password,url}=req.body
    if(!email || !name || !password){
        // return next(new CustomError('Plz Send Email',400))
        return next(new Error("Name ,email and password are required"))
    }


    const user=await User.create({
        name,
        email,
        password,
        url:req.body.url1
    })
    console.log(user)
    //method to generte a cookie with the token generated with the expiry date ...........................
   res.status('200').json({
        name,
        email,
        token:user.getJwtToken()
   })
    
})

exports.signin=BigPromise(async (req,res)=>{

    const {email,password}=req.body
    console.log("password "+password)

    const user=await User.findOne({email:email}).select("+password") 

    if(!user)
    {
        return res.status(401).json({
            message:"User does not exsist Plz Signup"
        })
    }

    if(!await  bcrypt.compare(password,user.password)){
       
        return res.status(401).json({
            message:"Password does not match "
        })
    }
    const token=user.getJwtToken()
    res.status(200).json({
        user,
        token
    })
    
})

