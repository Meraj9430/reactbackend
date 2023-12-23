import express from "express";

import {
  AddDoctor,
  DeleteDoctor,
  GetDoctor,
  GetDoctorById,
  LoginDoctor,
  UpdateDoctor,
} from "../controllers/doctor.controller.js";
import { doctorValidation } from "../validators/doctorValidator.js";
const router = express.Router();

const validatedoctor = (req, res, next) => {
  const { error } = doctorValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

router.post("/addDoctor", validatedoctor, AddDoctor);
router.get("/getDoctor", GetDoctor);
router.delete("/deleteDoctor/:id", DeleteDoctor);
router.put("/updateDoctor/:id", validatedoctor, UpdateDoctor);
router.get("/getDoctorById/:id", GetDoctorById);
router.post("/login", LoginDoctor);
export default router;
