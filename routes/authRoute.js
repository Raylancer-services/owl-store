const express=require('express');
const router=express.Router();
const {CreateUser,LoginUser,CreateSeller}=require('../controllers/authController')


router.post('/register',CreateUser);
router.post('/login',LoginUser);
router.post('/registerSeller',CreateSeller);
// router.post('/loginSeller',LoginSeller);


module.exports=router;