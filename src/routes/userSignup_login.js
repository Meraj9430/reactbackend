import express from "express";
import {
  DeleteUser,
  GetUserById,
  UpdateUser,
  GetUsers,
  AddUser,
  LoginUser,
} from "../controllers/userSignup_login.js";
import { userSinupValidation } from "../validators/userSignup_login.js";

const router = express.Router();
const validateUser = (req, res, next) => {
  const { error } = userSinupValidation.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next();
};

router.post("/UserSignup", validateUser, AddUser);
router.post("/Userlogin", LoginUser);
router.get("/getUsers", GetUsers);
router.delete("/deleteUser/:id", DeleteUser);
router.put("/updateUser/:id", UpdateUser);
router.get("/getUserById/:id", GetUserById);

export default router;
