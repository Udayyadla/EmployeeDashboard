const express=require("express")
const router=express.Router()
const {upload}=require("../upload")
const {authenticateUser}=require("../Authentication/Auth")
const {createNewEmployee,getEmployeeDetails,updateEmployee,deleteEmployee,getoneEmployee}=require("../controllers/employee.controller")


router.post("/addEmployee",authenticateUser,upload.single("image"),createNewEmployee)
router.get("/getEmployeesData",getEmployeeDetails)
router.put("/updateEmployeesData/:id",upload.single("image"),updateEmployee)
router.delete("/deleteEmployee/:id",deleteEmployee)
router.get("/getoneEmployee/:id",getoneEmployee)
module.exports=router