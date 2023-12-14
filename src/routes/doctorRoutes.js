import express from "express";
import {
  AddDoctor,
  DeleteDoctor,
  GetDoctor,
  GetDoctorById,
  UpdateDoctor,
} from "../controllers/doctor.controller.js";

const router = express.Router();

router.post("/addDoctor", AddDoctor);
router.get("/getDoctor", GetDoctor);
router.delete("/deleteDoctor/:id", DeleteDoctor);
router.put("/updateDoctor/:id", UpdateDoctor);
router.get("/getDoctorById/:id", GetDoctorById);

export default router;
