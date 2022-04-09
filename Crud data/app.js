const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
//const envData = require('./env.json');
//require('dotenv').config()
const dressRoute = require('./routes/dress.routes');
//const { kill } = require('nodemon/lib/monitor/run');

const app = express();
app.use(cors());

app.get("/healthcheck", async(req,res)=>{
    console.log("it works");
   // process.exit(1);
    res.send({status: 'Success'})
})
mongoose.connect('mongodb://localhost:27017/ecommerece', {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(data=>{
    console.log("database connected")
}).catch(err=>{
    console.log(err.message)
   process.exit(1)
})
app.use(express.json());
app.use('/api/v1/dress/',dressRoute);

app.listen(1000, ()=>{
    console.log("start....")
})

