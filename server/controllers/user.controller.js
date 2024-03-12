const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../models/user.model");
const { createSecretToken } = require("../utils/secretToken");
exports.userRegistration = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "Fail", message: "user already exists!!!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const userData = await User.create({
        username,
        password: hashedPassword,
      });
      return res
        .status(200)
        .json({
          status: "Success",
          message: "Registered Successfully!!",
          userData,
        });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res
        .status(400)
        .json({ status: "Fail", message: "Invalid Username" });
    } else {
      passwordValidation = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordValidation) {
        return res
          .status(400)
          .json({ status: "Fail", message: "Invalid password" });
      } else {
        const token = createSecretToken(user._id);
        res.cookie("token", token, {
          withCredentials: true,
          httpOnly: false,
          expires: new Date(Date.now() + 3600 * 1000),
        });
        return res
          .status(200)
          .json({
            status: "Success",
            message: `Hey ${username}! you login successfull`,
            token,
          });
      }
    }
  } catch (err) {
    return res.status(500).json({ status: "Fail", message: err.message });
  }
};
