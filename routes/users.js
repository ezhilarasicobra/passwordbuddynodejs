const express=require('express')
const router=express.Router()
const User=require('../models/users')
const bcrypt = require('bcrypt');
//register
router.post('/register',async(req,res)=>{
  try {
    //generate new password and hash it
    const salt= await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(req.body.password,salt)
    //cretae new user
    const newUser=await new User({
      username:req.body.username,
      email:req.body.email,
      password:hashedPassword
    })
    ///save the user and response
    const user= await newUser.save()
    res.status(200).json(user._id)

  } catch (error) {
    res.status(500).json(error)
    console.log(error)
  }
})
//login
router.post('/login',async(req,res)=>{
try {
  //find user
  const user = await User.findOne({username:req.body.username})
  !user && res.status(400).json("Invalid credentials")
  //validate password
  const validPassword=await bcrypt.compare(
    req.body.password,
    user.password
  )
  !validPassword && res.status(400).json("Invalid credentials")
  //send response

  res.status(200).json({_id:user._id,username:user.username})
} catch (error) {
  res.status(500).json(error)
}
})


module.exports=router;
