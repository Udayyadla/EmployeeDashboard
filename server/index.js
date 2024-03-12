const express=require("express")
const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const cookieParser = require('cookie-parser');
const cors=require("cors")
const path=require("path")
require('dotenv').config()
const PORT=process.env.PORT || 9000
const app=express()
const Userroutes=require("./routes/user.routes")
const EmployeeRoutes=require("./routes/employee.routes")
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  
  }))
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("database connection successful")
    app.listen(PORT,()=>console.log("app listening at ",PORT))
})
.catch((err)=>console.log(console.log("db connection failure")))
app.use("/",Userroutes)
app.use("/",EmployeeRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
