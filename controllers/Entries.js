const EntriesModel = require("../models/entries");
const mongoose=require('mongoose')

const getallentries = async (req, res) => {
  try {
    const newentry = await EntriesModel.find();
    res.status(200).json(newentry);
  } catch (error) {
    res.status(404).json(error);
  }
};

const createanentry=async(req,res)=>{
const entrybody=req.body

const newEntry=new EntriesModel(entrybody)

try {
  await newEntry.save()
  res.status(201).json(newEntry)
  
} catch (error) {
  res.status(409).json(error)
}
}
const updateanentry=async(req,res)=>{
  const{id:_id}=req.params
  const entbody=req.body
  if(!mongoose.Types.ObjectId.isValid(_id)) res.status(404).json("No entries with this id")

  const updatedpost=await EntriesModel.findByIdAndUpdate(_id,{...entbody,_id},{new:true})
  res.json(updatedpost)
}

const deleteanentry =async(req,res)=>{
const {id}=req.params
if(!mongoose.Types.ObjectId.isValid(id)) res.status(404).json("No entries with this id")
await EntriesModel.findByIdAndRemove(id)
res.json({message:"deleted successfully"})

}
module.exports = { getallentries,createanentry,updateanentry,deleteanentry };
