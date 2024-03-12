const mongoose = require("mongoose");
const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, // Convert to lowercase
    validate: {
      validator: function (value) {

        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  mobileNumber: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return /^\d{10}$/.test(value);
      },
      message: "Invalid mobile number format",
    },
  },
  designation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["M", "F"],
  },
  course: {
    type: String,
    required: true,
    enum: ["bca", "mca", "bsc"],
  },
  createDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  image: {
    type: String,
    required: true,
  },
});
const employee = new mongoose.model("employee", employeeSchema);
module.exports = employee;
