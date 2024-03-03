const express=require('express')
const router=express.Router()
const {addcomplaint,getcomplaint,editcomplaint}=require('../controller/complaintController')

const {isLoggedIn}=require('../middlewares/user')

router.route('/addcomplain').post(isLoggedIn,addcomplaint)
router.route('/getcomplain').get(isLoggedIn,getcomplaint)

router.route('/updatecomplaint/:id').put(editcomplaint)

module.exports=router;