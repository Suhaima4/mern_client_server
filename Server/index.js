const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 
const userRouter = require('./Routes/auth')
const cookieParser = require('cookie-parser')
const recipeRouter = require('./Routes/reciper')

const app =express()

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true


}))
app.use(cookieParser())
app.use(express.json())
app.use('/auth',userRouter)
app.use('/recipe',recipeRouter)

mongoose.connect("mongodb+srv://suhaimams:suhi1234@cluster0.hpiadrw.mongodb.net/MEARN?retryWrites=true&w=majority")  
   


app.listen( 8000,() =>{
    console.log("server is running on port 8000")
})