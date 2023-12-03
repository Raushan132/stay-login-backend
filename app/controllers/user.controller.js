const User = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const salt = 10;


exports.save = async (req,res)=>{

if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
     return res.status(400).send({
        message:"All Field are required"
     })
}


    
//create user

     const user = new User({
         firstName: req.body.firstName,
         lastName: req.body.lastName,
         email: req.body.email,
         password: req.body.password

     })

   const isEmailExit = await User.findOne({email:user.email})
   if(isEmailExit){
   return res.status(409).send({
      message:"user is already exits"
     })
   }else   {
    //password ecryption
    user.password =await bcrypt.hash(req.body.password,salt);

     //save user
     user.save().then(data=>{res.send(data)}).catch(err=>res.status(500).send({
       message: err.message || "Internal server error"
      }));
      
    }
}

