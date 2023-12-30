import asyncHandler from "express-async-handler";
import { getAllAppointmentsData } from "../services/doctorUserAppointment.js";


export const GetAllAppointmentsData = asyncHandler(async (req, res) => {
  const result = await getAllAppointmentsData(req, res);
});
