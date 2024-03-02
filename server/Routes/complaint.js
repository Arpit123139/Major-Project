const express=require('express')
const router=express.Router()
const {addcomplaint,getcomplaint}=require('../controller/complaintController')


router.route('/addcomplain/:token').post(addcomplaint)
router.route('/getcomplain/:token').get(getcomplaint)

module.exports=router;