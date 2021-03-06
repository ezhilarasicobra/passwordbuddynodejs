const path=require('path')
require('dotenv').config({path:path.resolve(__dirname,'./.env')})
const express=require('express')
const app= express()
const dbconnection =require('./db')
dbconnection()
const cors=require('cors')
const entries=require('./routes/entries')
const users=require('./routes/users')
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/api/entries',entries)
app.use('/api/users',users)

app.listen(process.env.PORT,()=>{console.log(`App is listening on ${process.env.PORT}`)})