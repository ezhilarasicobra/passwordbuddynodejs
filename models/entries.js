const mongoose=require('mongoose')

const entriesSchema=mongoose.Schema({
  title:String,
  message:String,
  createdAt:{
    type:Date,
    default:new Date()
  }
  
})

module.exports=mongoose.model('Entries',entriesSchema)