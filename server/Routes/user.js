const express=require('express')
const router=express.Router()
const {signup,signin,studentProfile,editImage}=require('../controller/userController')


router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/studentProfile/:token').get(studentProfile)
router.route('/editImage/:token').patch(editImage)
module.exports=router;