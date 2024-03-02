const express=require('express')
const router=express.Router()
const {addcomplaint,getcomplaint}=require('../controller/complaintController')

const {isLoggedIn}=require('../middlewares/user')

router.route('/addcomplain').post(isLoggedIn,addcomplaint)
router.route('/getcomplain').get(isLoggedIn,getcomplaint)

module.exports=router;