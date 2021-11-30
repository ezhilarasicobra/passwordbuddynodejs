const express=require('express')
const mongoose=require('mongoose')
const router=express.Router()
const Entries =require('../models/entries')
const {getallentries,createanentry,updateanentry,deleteanentry} =require('../controllers/Entries')
//get all entries
router.get('/',getallentries)
//create a entry
router.post('/',createanentry)


router.patch('/:id',updateanentry)

router.delete('/:id',deleteanentry)


module.exports=router