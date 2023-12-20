import express from "express";
import doctorRoute from "./doctorRoutes.js";
import doctorRoutes from "./doctorSignup_login.js";
import userRoute from "./userSignup_login.js";
const router = express.Router();

router.use("/doctor", doctorRoute);
router.use("/doctorSignup_login", doctorRoutes);
router.use("/userSignup_login", userRoute);

export default router;
