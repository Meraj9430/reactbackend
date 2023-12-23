import asyncHandler from "express-async-handler";
import {
  addDoctor,
  deletedoctor,
  getDoctor,
  getDoctorById,
  loginDoctor,
  updateDoctor,
} from "../services/doctorService.js";

export const AddDoctor = asyncHandler(async (req, res) => {
  const doctor = await addDoctor(req, res);
});
export const LoginDoctor = asyncHandler(async (req, res) => {
  const doctor = await loginDoctor(req, res);
});

export const GetDoctorById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await getDoctorById(id);
  res.status(200).send({ result });
});

export const GetDoctor = asyncHandler(async (req, res) => {
  try {
    const { page, size, search, sort } = req.query;

    const paginationOptions = {
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
    };

    const filter = {};

    // Check if "search" is provided and add conditions accordingly
    if (search) {
      filter.$or = [
        { city: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        // Add more conditions if needed
      ];
    }

    const sortingOptions = sort ? sort.split(",") : ["", ""];
    const sortByField = sortingOptions[0];
    const sortDirection = sortingOptions[1];
    const sortBy = {};

    if (sortByField) {
      sortBy[sortByField] = sortDirection;
    } else {
      sortBy.name = 1;
    }

    const result = await getDoctor(paginationOptions, filter, sortBy);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const DeleteDoctor = asyncHandler(async (req, res) => {
  const result = await deletedoctor(req, res);
});

export const UpdateDoctor = asyncHandler(async (req, res) => {
  const success = await updateDoctor(req, res);
});
