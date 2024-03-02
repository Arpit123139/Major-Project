const express=require('express')
const router=express.Router()
const {addfeedback,test,getfeedback}=require('../controller/feedbackController')

const {isLoggedIn}=require('../middlewares/user')

router.route('/addfeedback').post(isLoggedIn,addfeedback)
router.route('/getfeedback').get(isLoggedIn,getfeedback)

module.exports=router;