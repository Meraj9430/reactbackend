import asyncHandler from "express-async-handler";
import {
  addImage,
  deleteimage,
  getImage,
  getImageById,
  updateImage,
} from "../services/homePageImage.js";

export const AddImage = asyncHandler(async (req, res) => {
  const image = await addImage(req, res);
});

export const GetImageById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await getImageById(id);
  res.status(200).send({ result });
});

export const GetImage = asyncHandler(async (req, res) => {
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

    const result = await getImage(paginationOptions, filter, sortBy);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const DeleteImage = asyncHandler(async (req, res) => {
  const result = await deleteimage(req, res);
});

export const UpdateImage = asyncHandler(async (req, res) => {
  const success = await updateImage(req, res);
});
