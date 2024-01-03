import express from "express";
import { AddUserAppointmentId, DeleteUserAppointmentId, GetUserAppointmentId, GetUserAppointmentIdbyid, UpdateUserAppointmentId } from "../controllers/userAppointment.js";


const router = express.Router();

router.post("/addUserAppointment", AddUserAppointmentId);
 router.get("/getUserAppointment", GetUserAppointmentId);
 router.get("/getUserAppointmentById/:id", GetUserAppointmentIdbyid);
router.put("/updateUserAppointment/:id", UpdateUserAppointmentId);
router.delete("/deleteUserAppointment/:id", DeleteUserAppointmentId);

export default router;
