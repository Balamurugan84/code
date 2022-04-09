const router = require('express').Router();
const dressSchema = require("../models/dress.model");

router.post('/addNewDress', async(req,res)=>{
    try{
        let detail = req.body
        const data = new dressSchema(detail);
        const result = await data.save();
        return res.status(200).json({'status': 'success', "message": "details added successfully", "result": result})
    }catch(error){
        console.log(error.message);
        return res.status(404).json({"status": 'failure', 'message': error.message})
    }
});
router.get("/getAllDress", async(req,res)=>{
    try{
        const dressDetails = await dressSchema.find().exec();
        if(dressDetails.length > 0){
            return res.status(200).json({'status': 'success', message: "details fetched successfully", 'result': dressDetails});
        }else{
            return res.status(404).json({'status': 'failure', message: "No details available"})}
    }catch(error){
        console.log(error.message);
        return res.status(400).json({"status": 'failure', 'message': error.message})}
});
router.get("/getIndividualDress", async(req,res)=>{
    try {
        const dressDetails = await dressSchema.findOne({"uuid" : req.query.dress_uuid}).exec();
        if(dressDetails){
            return res.status(200).json({'status': 'success', message: "details fetched successfully", 'result': dressDetails});
        }else{
            return res.status(404).json({'status': 'failed', message: "No details available"})
        }
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({"status": 'failed', 'message': error.message})
    }
});
router.put("/updateNewDress", async(req,res)=>{
    try {
        let condition = {"uuid": req.body.uuid}
        let updateData = req.body.updateData;
        let option = {new: true}
        const data = await dressSchema.findOneAndUpdate(condition, updateData, option).exec();
        return res.status(200).json({'status': 'success', message: "details updated successfully", 'result': data});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({"status": 'failed', 'message': error.message})
    }
});
router.delete("/deleteDressDetail/:dress_uuid", async(req,res)=>{
    try {
        console.log(req.params.dress_uuid)
        await dressSchema.findOneAndDelete({uuid: req.params.dress_uuid}).exec();
        return res.status(200).json({'status': 'success', message: "details deleted successfully"});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({"status": 'failed', 'message': error.message})
    }
})

module.exports = router;