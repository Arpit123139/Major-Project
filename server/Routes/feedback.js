const express=require('express')
const router=express.Router()
const {addfeedback,test,getfeedback}=require('../controller/feedbackController')


router.route('/addfeedback/:token').post(addfeedback)
router.route('/getfeedback/:token').get(getfeedback)

module.exports=router;