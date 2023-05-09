const express=require('express')
const app=express()

app.get('/hello',(req,res)=>{
    res.send("hello worlds")
})

app.listen(5000,()=>{
    console.log("server started on 5000")
})