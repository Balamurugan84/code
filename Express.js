console.log("hi")
const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
 const app= express();
 const port = process.env.PORT || 5000
  app.get("/HealthCheck",async(req,res)=>{
      console.log("hello");
      res.send({status: "sucess"})
    
  })

  app.listen(port,()=>{
      console.log("Start")
  })