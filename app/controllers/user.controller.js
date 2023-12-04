const User = require('../models/user.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const salt = 10;


exports.save = async (req,res)=>{

if(!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password){
     return res.status(400).send({
        message:"All Field are required"
     })
}

const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

if(!req.body.email.match(emailFormat)) return res.status(400).send({
  message:"Email is not valid"
});
    
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

exports.login = async(req, res)=>{

  //validation
  if(!req.body.email || !req.body.password){
    return res.status(400).send({
       message:"All Field are required"
    })
}
const emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

if(!req.body.email.match(emailFormat)) return res.status(400).send({
  message:"Email is not valid"
});

const user = await User.findOne({email:req.body.email})
 if(!user) return res.status(401).send({
  message:'user not found'
 })
   
 const identified= await bcrypt.compare(req.body.password,user.password)
 if(!identified) return res.status(401).send({
  message:'Invalid email and password'
 })

    
    res.send({firstName:user.firstName,lastName:user.lastName,email:user.email})
}

