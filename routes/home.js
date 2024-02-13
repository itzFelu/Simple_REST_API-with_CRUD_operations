const express=require('express')
const {handleGetAllUsersHTML}=require('../controllers/user')
const router=express.Router()

router.get('/',(req,res)=>{
    res.status(200).json({status: true,message:"hemlo guys"});
})
router.get('/users',handleGetAllUsersHTML)


module.exports=router