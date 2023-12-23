import asyncHandler from "express-async-handler";
import userSchema from "../modles/userSignup_login.js";
import { createOtp, signUp, verifyOtp } from "../services/userSignup_login.js";

export const Signup = asyncHandler(async (req, res) => {
  const user = await signUp(req, res);
});
export const CreateOtp = asyncHandler(async (req, res) => {
  const user = await createOtp(req, res);
});

export const VerifyOtp = asyncHandler(async (req, res) => {
  const user = await verifyOtp(req, res);
});
