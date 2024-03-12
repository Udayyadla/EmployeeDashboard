const Employee = require("../models/employee.model");
const fs = require("fs");
const path = require("path");

exports.createNewEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      course,
      createDate,
      designation,
      mobileNumber,
      gender,
    } = req.body;
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }    console.log(req.file)
    if (!req.file) {
  
      return res.status(400).send({"message":"No file uploaded."});
    }
    const employeeDetails = Employee({
      email,
      name,
      course,
      createDate,
      designation,
      mobileNumber,
      gender,
      image: req.file.filename,
    });
    await employeeDetails.save();

    return res.status(200).json({
      message: "Employee created successfully",
      employeesData: employeeDetails,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getEmployeeDetails = async (req, res) => {
  try {
    const employeeData = await Employee.find({});
    return res.status(200).json({
      message: "Employee data fetched successfuly",
      details: employeeData,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
/* ------------------------------------------------------------------------------------------ */
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the provided ID is valid
    if (!id) {
      return res.status(400).json({ message: "Employee ID is required" });
    }

    // Check if the employee exists
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    if (req.body.name) existingEmployee.name = req.body.name;
    if (req.body.email) existingEmployee.email = req.body.email;
    if (req.body.course) existingEmployee.course = req.body.course;
    if (req.body.createDate) existingEmployee.createDate = req.body.createDate;
    if (req.body.designation)
      existingEmployee.designation = req.body.designation;
    if (req.body.mobileNumber)
      existingEmployee.mobileNumber = req.body.mobileNumber;
    if (req.body.gender) existingEmployee.gender = req.body.gender;

    // Check if a new image file is uploaded
    if (req.file) {
      if (existingEmployee.image) {
        fs.unlinkSync(
          path.join(__dirname, "../uploads", existingEmployee.image)
        );
      }
      existingEmployee.image = req.file.filename;
    }

    // Save the updated employee details
    await existingEmployee.save();

    return res.status(200).json({
      message: "Employee updated successfully",
      employeeData: existingEmployee,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    console.log("running")
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    // Find the employee by ID
    const employee = await Employee.findById(id);

    // Check if the employee exists
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Delete the employee from the database
    await Employee.findByIdAndDelete(id);

    // Return success response
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    // Handle errors
    console.log("Error deleting employee:", err);
    return res
      .status(500)
      .json({ message: "Failed to delete employee", error: err.message });
  }
};
exports.getoneEmployee=async(req,res)=>{
  try{
    const { id } = req.params;
    const existingEmployee = await Employee.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }else{
      return res.status(200).json({message:"success",employeeDetails:existingEmployee})
    }

  }catch(err){
    return res.status(500).json({ message: "Failed to get employee details", error: err.message });
  }
}
