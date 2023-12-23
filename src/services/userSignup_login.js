// userController.js
import asyncHandler from "express-async-handler";
import User from "../modles/userSignup_login.js";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import sendOTPviaSMS from "../middleware/sendOtp.js"; // Implement this function

export const signUp = asyncHandler(async (req, res) => {
  try {
    const { FirstName, MobileNumber } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ MobileNumber });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "User with this mobile number already exists.",
      });
    }

    // Create a new user with name and mobile number
    const user = await User.create({
      FirstName,
      MobileNumber,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const createOtp = asyncHandler(async (req, res) => {
  const {  MobileNumber } = req.body;

  const user = await User.findOne({  MobileNumber });

  if (user) {
    const otp = generateOTP(); // Use the otpGenerator function
    user.otp = otp;
    await user.save();

    sendOTPviaSMS(user.MobileNumber, otp); // Implement this function

    res.status(200).json({
      success: true,
      message: "OTP sent successfully.",
    });
  } else {
    res.status(404).json({
      success: false,
      error: "User not found.",
    });
  }
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const {  OTP } = req.body;

  const user = await User.findOne({  MobileNumber });

  if (user && user.otp && user.otp === OTP) {
    // Clear the OTP after successful login
    user.otp = null;
    await user.save();

    // Proceed with login logic
    const accessToken = jwt.sign(
      {
        userData: {
          username: user.FirstName,
          mobileNumber: user.MobileNumber,
          id: user.id,
         
        },
      },
      process.env.secretKey,
      { expiresIn: process.env.Range }
    );

    res.status(200).json({
      success: true,
      token: accessToken,
      // roleid: user.roleId,
    });
  } else {
    res.status(401).json({
      success: false,
      error: "Invalid OTP or user not found.",
    });
  }
});


function generateOTP() {
  // Generate a random 4-digit OTP
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}
