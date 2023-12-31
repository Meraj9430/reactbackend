import express from "express";
import doctorRoute from "./doctorRoutes.js";
import doctorRoutes from "./doctorSignup_login.js";
import doctorTimeSlot from "./doctor_time_slot.js";
import userRoute from "./userSignup_login.js";
import imageRoute from "./homePageImage.js";
import appointment from "./doctorUserAppointment.js";
import userAppointment from "./userAppointment.js";
const router = express.Router();

router.use("/doctor", doctorRoute);
router.use("/doctorSignup_login", doctorRoutes);
router.use("/timeSlot", doctorTimeSlot);
router.use("/userSignup_login", userRoute);
router.use("/image", imageRoute);
router.use("/doctorUserAppointment", appointment);
router.use("/userAppointment", userAppointment);

export default router;
