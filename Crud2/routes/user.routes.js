const router = require("express").Router();
//const crypto = require('crypto');
const bcrypt = require("bcrypt");
//const res = require("express/lib/response");
const jwt =require("jsonwebtoken");
const moment =require("moment");
const userSchema=require("../models/user");

 router.post("/signUp", async(req,res)=>{
     try {
     const userName= req.body.userName;
      const email=req.body.email;
      const mobileNumber=req.body.mobileNumber



     if(userName){
          let userNameDetail= await userSchema.findOne({"username": userName}).exec()
          if(userNameDetail){
              return res.json({status:"failed",message: "username already exist"}) 
           }else{
               return res.status(404).json({status:"failed",message:"try another username"})
           }
      }
      if(email){
          let emailDetail= await userSchema.findOne({"email": email}).exec()
          if(emailDetail){
              return res.json({status:"failed",message: "email already exist"})
          }else{
              return res.status(404).json({status:"failed",message:"try another email"})
          }
      }
      if(mobileNumber){
          let mobileNumberDetail= await userSchema.findOne({"mobileNumber": mobileNumber}).exec()
          if(mobileNumberDetail){
              return res.json({status:"failed",message: "mobileNumber already exist"})
          }else{
              return res.status(404).json({status:"failed",message:"try another mobileNumber"})
          }
      }

      let user = new userSchema(req.body);
     if(req.body.password){
         let password = req.body.password;
         let salt = await bcrypt.genSalt(10);
         console.log("_".repeat(2))
         user.password = bcrypt.hashSync(password, salt);
      }
     let result = await user.save();

     return res.status(200).json({status:"success",message:"signUped successfully",data:result})
 }
     catch (error){
         console.log(error.message)
         return res.status(404).json({status: "failed", message: error.message})
     }
 });


 router.post("/login",async(req,res)=>{
     try{
     let userName= req.body.userName
     let password=req.body.password
     let userNameDetail= await userSchema.findOne({userName:"username"}).select("-password-_id").exec()
    
     if(userName){
         const userNameDetail=await userSchema.findOne({userName:"username"}).exec()
         if(!userName){
             return res.status(400).json({status:failed, message:"sign in"})
         }else{
             return res.status(400).json({status:failed, message:"enter your name"})
         }
     }if(userNameDetail){
         let isMatch = await bcrypt.compare(password, userDetails.password)
         if(userNameDetail!==true){
             await userSchema.findOneAndUpdate({uuid: userDetails.uuid},{new:true}).exec()
         }let payload={uuid: userNameDetail.uuid}
         if(isMatch){
             var userdata =userDetails.toObject()
             let jwttoken = jwt.sign(payload,'superKey');
             userdata.jwttoken=jwttoken
             return res.status(400).json({status:"success", message:"login successfully",data:{userdata, jwttoken}})
         }else{
             return res.status(200).json({status:"failed", message: "loginn failed"})
         }
     }
 }catch(error){
     console.log(error.message)
     return res.status(404).json({status:"failed",message:error.message})
 }
 })

 router.post("/logout/:uuid", async(req,res)=>{
     try {
         let date = moment().toDate();
         console.log(date)
         await userSchema.findOneAndUpdate({uuid: req.params.uuid},{new:true}).exec()
         return res.status(200).json({status: "success", message: "Logout success"})
     } catch (error) {
         console.log(error.message)
         return res.status(404).json({status: "failed", message: error.message})
     }
 })


module.exports=router;

