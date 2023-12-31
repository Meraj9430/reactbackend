import express from "express";
import {
  DeleteUser,
  GetUserById,
  UpdateUser,
  GetUsers,
  AddUser,
  LoginUser,
} from "../controllers/doctorSignup_login.js";
import { doctorSinupValidation } from "../validators/doctorSignup_login.js";

const router = express.Router();
const validateDoctor = (req, res, next) => {
  const { error } = doctorSinupValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

router.post("/DoctorSignup", validateDoctor, AddUser);
router.post("/Doctorlogin", LoginUser);
router.get("/getUsers", GetUsers);
router.delete("/deleteUser/:id", DeleteUser);
router.put("/updateUser/:id", UpdateUser);
router.get("/getUserById/:id", GetUserById);

export default router;
