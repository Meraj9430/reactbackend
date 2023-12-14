import express from "express";
import doctorRoute from "./doctorRoutes.js";

const router =express.Router();

router.use("/doctor",doctorRoute);


export default router;