import asyncHandler from "express-async-handler";
import User from "../modles/userSignup_login.js";
import jwt from "jsonwebtoken";
import Appointment from "../modles/docterUserAppointment.js";
import { v4 as uuid } from "uuid";

export const addUser = asyncHandler(async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password, Mobile, City, Referral } =
      req.body;
    // const { City, State, ZipCode, Country } = Address;

    const user = await User.create({
      FirstName,
      LastName,
      Email,
      Password,
      Mobile,
      City,
      Referral, // Use the hashed password
    });
    // const appointmentId = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

    // // Create an appointment associated with the user
    // const appointmentData = {
    //   doctorId: null, // No doctor ID initially
    //   userId: user._id, // Use the user's ID
    //   appointmentId: appointmentId,
    // };

    // const appointment = await Appointment.create(appointmentData);

    res.status(201).json({
      success: true,
      data: user,
      // appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { Email, Password } = req.body;

  const user = await User.findOne({ Email });

  if (user && user.Password === Password) {
    const accessToken = jwt.sign(
      {
        userData: {
          username: user.FirstName,
          email: user.Email,
          id: user.id,
          roleId: user.roleId,
        },
      },
      process.env.secretKey,
      { expiresIn: process.env.Range }
    );
    //console.log(accessToken)
    return {
      token: accessToken,
      roleid: user.roleId,
      userId: user.id,
    };
  } else {
    res.status(401);
    throw new Error("User or Password is Wrong");
  }
});

export const getUsers = asyncHandler(
  async (paginationOptions, filter, sort) => {
    try {
      const { page, size } = paginationOptions;
      const totalDocuments = await User.countDocuments(filter);
      const totalPages = Math.ceil(totalDocuments / size);
      const skip = (page - 1) * size;

      const collation = {
        locale: "en",
        strength: 2,
      };

      const success = await User.find(filter)
        .collation(collation)
        .sort(sort)
        .skip(skip)
        .limit(size);
      // .populate("roleId");

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

export const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await User.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    return { error: "not deleted..." };
  }
});

export const getUserById = asyncHandler(async (id) => {
  const success = await User.findById(id);
  // .populate("roleId");
  console.log(success);
  return success;
});

export const updateUser = asyncHandler(async (id, updatedData) => {
  const success = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  console.log(success);
  return success;
});
