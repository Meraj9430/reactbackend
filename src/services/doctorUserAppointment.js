import asyncHandler from "express-async-handler";
import Appointment from "../modles/docterUserAppointment.js";

export const getAllAppointmentsData = asyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctorId");
    //       .populate("userId");

    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});
