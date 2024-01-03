import express from "express";
import {
  AddImage,
  DeleteImage,
  GetImage,
  GetImageById,
  UpdateImage,
} from "../controllers/homePageImage.js";

// import { doctorSinupValidation } from "../validators/doctorSignup_login.js";

const router = express.Router();
// const validateDoctor = (req, res, next) => {
//   const { error } = doctorSinupValidation.validate(req.body);

//   if (error) {
//     return res.status(400).json({ error: error.details[0].message });
//   }

//   next();
// };

// router.post("/DoctorSignup", AddUser);
router.post("/addImage", AddImage);
router.get("/getImage", GetImage);
router.delete("/deleteUser/:id", DeleteImage);
router.put("/updateUser/:id", UpdateImage);
router.get("/getUserById/:id", GetImageById);

export default router;
