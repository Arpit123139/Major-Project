const express=require('express')
const router=express.Router()
const {signup,signin,studentProfile,editImage,editStudentProfile,applyHostel}=require('../controller/userController')
const {isLoggedIn}=require('../middlewares/user')

router.route('/signup').post(signup)
router.route('/signin').post(signin)
router.route('/studentProfile').get(isLoggedIn,studentProfile)
router.route('/editImage').patch(isLoggedIn,editImage)
router.route('/editStudentProfile').patch(isLoggedIn,editStudentProfile)
router.route('/applyHostel').patch(isLoggedIn,applyHostel)
module.exports=router;