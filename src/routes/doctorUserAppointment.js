import express from "express";
import { GetAllAppointmentsData } from "../controllers/doctorUserAppointment.js";

const router = express.Router();

router.get("/getAppointment", GetAllAppointmentsData);
// router.get("/getAppointment/:id", GetAllAppointmentsData);

export default router;
