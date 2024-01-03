import asyncHandler from "express-async-handler";
import Doctor from "../modles/doctor_time_slot.js";

export const adddoctor = asyncHandler(async (req, res) => {
  //   console.log(req.body);
  try {
    const {
      doctorId,
      days,
      start_time,
      end_time,
      fee,
      morning,
      afternoon,
      evening,
    } = req.body;

    const doctor = await Doctor.create({
      doctorId,
      days,
      start_time,
      end_time,
      fee,
      morning,
      afternoon,
      evening,
    });

    res.status(201).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const getDoctor = asyncHandler(
  async (paginationOptions, filter, sort) => {
    try {
      const { page, size } = paginationOptions;
      const totalDocuments = await Doctor.countDocuments(filter);
      const totalPages = Math.ceil(totalDocuments / size);
      const skip = (page - 1) * size;

      const collation = {
        locale: "en",
        strength: 2,
      };

      const success = await Doctor.find(filter)
        .collation(collation)
        .sort(sort)
        .skip(skip)
        .limit(size)
        .populate("doctorId");

      return {
        page,
        size,
        data: success,
        previousPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        totalDocuments,
      };
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
);

export const deleteDoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await User.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    return { error: "not deleted..." };
  }
});

export const getDoctorById = asyncHandler(async (id) => {
  const success = await Doctor.findById(id).populate("doctorId");
  console.log(success);
  return success;
});

export const updateDoctor = asyncHandler(async (id, updatedData) => {
  const success = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  console.log(success);
  return success;
});
