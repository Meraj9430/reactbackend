import asyncHandler from "express-async-handler";
import User from "../modles/userAppointment.js";

export const addUserAppointmentId = asyncHandler(async (req, res) => {
  try {
    const { userId, date, time } = req.body;

    // Generate a random ID between 1000 and 5000
    const userAppointmentId =
      Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

    const user = await User.create({
      userId,
      date,
      status: "pending", // Assuming you want to set a default status
      time,
      userAppointmentId,
    });

    res.status(201).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const getUserAppointmentId = asyncHandler(async (req, res) => {
  try {
    const userAppointments = await User.find();
    res.status(200).json({
      success: true,
      data: userAppointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

export const deleteUserAppointmentId = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const success = await User.findByIdAndDelete(id);

  // Check if a document was found and deleted
  if (success) {
    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
    });
  } else {
    res.status(404).json({
      success: false,
      error: "id not found",
    });
  }
});

export const getUserAppointmentIdbyid = asyncHandler(async (id) => {
  const success = await User.findById(id).populate("doctorId");
  console.log(success);
  return success;
});

export const updateUserAppointmentId = asyncHandler(async (req, res) => {
  const id = req.params.id; // Assuming the appointment ID is in the request parameters
  const { status } = req.body; // Assuming the new status is in the request body

  // Check if the status is provided in the request body
  if (!status) {
    return res.status(400).json({
      success: false,
      error: "Status is required in the request body",
    });
  }

  try {
    const updatedAppointment = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        error: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
});

