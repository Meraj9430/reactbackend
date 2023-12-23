import express from "express";
import {
  CreateOtp,
  Signup,
  VerifyOtp,
} from "../controllers/userSignup_login.js";

// import { userSinupValidation } from "../validators/userSignup_login.js";

const router = express.Router();
// const validateUser = (req, res, next) => {
//   const { error } = userSinupValidation.validate(req.body);

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   next();
// };

router.post("/UserSignup", Signup);
router.post("/otp", CreateOtp);
router.post("/Userlogin", VerifyOtp);

export default router;
