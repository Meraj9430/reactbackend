import asyncHandler from "express-async-handler";
import userSchema from "../modles/userSignup_login.js";
import {
  addUser,
  deleteUser,
  getUserById,
  getUsers,
  loginUser,
  updateUser,
} from "../services/userSignup_login.js";

export const AddUser = asyncHandler(async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;

    const useAvailable = await userSchema.findOne({ Email });
    if (useAvailable) {
      res.status(400);
      throw new Error("Email already exit");
    }
    const user = await addUser(req, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const LoginUser = asyncHandler(async (req, res) => {
  try {
    const user = await loginUser(req, res);
    return res.status(200).send({ user, massage: "login Successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const GetUsers = asyncHandler(async (req, res) => {
  try {
    const { page, size, search, sort } = req.query;

    const paginationOptions = {
      page: parseInt(page) || 1,
      size: parseInt(size) || 10,
    };

    const filter = {
      $or: [{ FirstName: { $regex: search || "", $options: "i" } }],
    };
    const sortingOptions = sort ? sort.split(",") : ["", ""];
    const sortByField = sortingOptions[0];
    const sortDirection = sortingOptions[1];
    const sortBy = {};
    if (sortByField) {
      sortBy[sortByField] = sortDirection;
    }

    const result = await getUsers(paginationOptions, filter, sortBy);
    res.status(201).send(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const DeleteUser = asyncHandler(async (req, res) => {
  const result = await deleteUser(req, res);
});

export const UpdateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const success = await updateUser(id, updatedData, {
    new: true,
  });
  res.status(200).send({ success });
});

export const GetUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const result = await getUserById(id);
  res.status(200).send({ result });
});
