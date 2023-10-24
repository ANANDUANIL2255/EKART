// import .env file
require('dotenv').config()

// import express 
const express=require('express')
const router = require('./router/router')
const cors=require('cors')



// server creation using express
const server=express()

server.use(cors())

// to convert all incoming json data to js data
server.use(express.json())

// router set
server.use(router)

// import connection.js file
require('./connections/connection')

// run server

// port
const port=5001 || process.env.port

server.listen(port,()=>{
    console.log(`______server started at port number :: ${port}______`);
})

// api calls resolve
// server.post('/login',(req,res)=>{
//     console.log(req.body.acno);
//     console.log(req.body.psw);

//     res.send("login worked")
// })
