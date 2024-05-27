const { hashPassword, comparePassword } = require("../helper/authHelper");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');


const registerController = async(req, res)=>{
  
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
    return res.status(403).send({ message: "All Field Are Required" });
  }

  try {
    const existingUser = await User.findOne({email});
    if (existingUser) {
      return res.status(400).send({
        success: true,
        message: "User Already Exist",
      });
    }
    const hashedPassword = await hashPassword(password);
    
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user : user,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
    });
  }
};

const loginController = async(req, res)=>{

    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(403).send({ message: "All Field Are Required" });
      }
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).send({
          success: false,
          message: "User Not Found",
        });
      }
      const matchPassword = await comparePassword(password, user.password);
      if (!matchPassword) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      const token = await jwt.sign({_id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });

      return res.status(201).json({
        success: true,
        message: "Login Successfull",
        token, 
        user,
      });
    } catch (error) {
      console.log(error.message);
      return res.status(500).send({
        success: false,
        message: "Error in Login",
      });
    }
};

module.exports = {registerController, loginController};
