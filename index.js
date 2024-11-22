import jwt from 'jsonwebtoken'
import express from 'express'

const app = express()


app.get("/",(req,res)=>{
    console.log("hi")
    res.send("HELLO WORLD")
})


const secretKey = "ASA"
app.post("/login",(req,res)=>{
    let user = {
        id:1,
        username:"SID",
        email:"sid@gmail.com",
        password:"12345"
    }
    jwt.sign({user},secretKey,{expiresIn:'30s'},(err,token)=>{
        res.json({token})
    })

})

app.post("/profile",tokenextract,(req,res)=>{
    
    jwt.verify(req.token,secretKey,(err,authData)=>{
        if(err){
            res.json({err:err.name})
        }else{
            res.json({
                message:"PROFILE ACCESSED",
                authData
            })
        }
    })

})

function tokenextract(req,res,next){
const bearerHeader = req.headers['authorization']
if( bearerHeader !== undefined){
    
    const bearer = bearerHeader.split(" ")
    const token = bearer[1];
    req.token = token
    next();
}
else{
    res.err("TOKEN INVALID")
}
}

app.listen(3000,()=>{
    console.log("Localhost server running")
})