import asyncHandler from "express-async-handler";
import Doctor from "../modles/doctorsSchema.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dydfngksk",
  api_key: "398582974656751",
  api_secret: "32DlqJNslNvK9cGxW8Y-s6k08kI",
});
export const addDoctor = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      specialization,
      photo,
      city,
      experience,
      availableDays,
      availableTime,
      fee,
      description,
      email,
      phone,
    } = req.body;

    const file = req.files.Photo;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "Photo is required.",
      });
    }
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    const doctor = await Doctor.create({
      name,
      specialization,
      photo: result.secure_url,
      city,
      experience,
      availableDays,
      availableTime,
      fee,
      description,
      email,
      phone,
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

export const getDoctorById = asyncHandler(async (id) => {
  const success = await Doctor.findById(id);
  console.log(success);
  return success;
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
        .limit(size);

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
export const deletedoctor = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await Doctor.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    res.status(404).send({ massage: "ID not found " });
    return { error: "not deleted..." };
  }
});
export const updateDoctor = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (req.files && req.files.ProfilePicture) {
      const file = req.files.ProfilePicture;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePicture = result.secure_url;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({
        success: false,
        error: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedDoctor,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});
