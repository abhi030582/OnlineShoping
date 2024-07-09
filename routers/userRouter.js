const express =require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");

router.post("/signup",async (req,res)=>
{
   let body = req.body;
   try
   {
   const salt = await bcrypt.genSalt(10);
   const incryptPass = await bcrypt.hash(body.password,salt);
   body.password = incryptPass;
   const response = await User.create(body);
   if(response)
   {
    res.status(201).json({
        status:true,
        message:'user created succesfully'
    });
   }
   }
   catch(error)
   {
    res.status(401).json({
        status:false,
        error:'Data insertion error'+' '+error
    })
   }
});

router.post("/login",async (req,res)=>{
let body = req.body;
try
{
const { uname, password } = req.body;
const user = await User.findOne({uname});
console.log(user);
if(!user)
{
    res.status(201).json({
      status:false,
      message:'username  not found'
    });
}
else
{
    const isMatch = bcrypt.compare(password,user.password);
    if(isMatch)
    {
        res.status(201).json({
         status:true,
         message:'user login successfull'
        });
    }
}
}
catch(error)
{
  res.status(201).json({
    status:false,
    message:'Login error'+" "+error
  });
}
});   

module.exports = router;



