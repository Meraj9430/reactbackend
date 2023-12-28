import asyncHandler from "express-async-handler";
import Doctor from "../modles/doctorsSchema.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

cloudinary.config({
  cloud_name: "dydfngksk",
  api_key: "398582974656751",
  api_secret: "32DlqJNslNvK9cGxW8Y-s6k08kI",
});

export const addDoctor = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const {
      days,
      start_time,
      end_time,
      fee,
      morning,
      afternoon,
      evening,
      photo,
      doctorTimeDateId,
      password,
      registration,
      name,
      mobile,
      email,
      qualification,
      specialization,
      experience,
      gender,
      age,
      blood_group,
    } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        error: "Doctor email already exists.",
      });
    }

    const { house_street_no, colony_locality, city, state, country, pincode } =
      req.body;

    const { extra_mobile, languages, physical_info, virtual } = req.body;

    const { medical_registration_proof, degree_proof, govt_id_proof } =
      req.body;

    const uploadPhoto = req.body;

    let profilePictureUrl = "";
    let profilePictureUrl2 = "";
    let profilePictureUrl3 = "";
    let profilePictureUrl4 = "";
    let profilePictureUrl5 = "";

    if (req.files && req.files.Photo) {
      const file = req.files.Photo;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl = result.secure_url;
    }
    if (req.files && req.files.Photo2) {
      const file = req.files.Photo2;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl2 = result.secure_url;
    }
    if (req.files && req.files.Photo3) {
      const file = req.files.Photo3;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl3 = result.secure_url;
    }
    if (req.files && req.files.Photo4) {
      const file = req.files.Photo4;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl4 = result.secure_url;
    }
    if (req.files && req.files.Photo5) {
      const file = req.files.Photo5;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      profilePictureUrl5 = result.secure_url;
    }

    const doctor = await Doctor.create({
      days,
      start_time,
      end_time,
      fee,
      morning,
      afternoon,
      evening,
      photo: profilePictureUrl,
      doctorTimeDateId,
      password,
      registration,
      name,
      mobile,
      email,
      qualification,
      specialization,
      experience,
      gender,
      age,
      blood_group,

      house_street_no,
      colony_locality,
      city,
      state,
      country,
      pincode,

      extra_mobile,
      languages,
      physical_info,
      virtual,

      medical_registration_proof: profilePictureUrl2,
      degree_proof: profilePictureUrl3,
      govt_id_proof: profilePictureUrl4,
      Upload_Photo: profilePictureUrl5,
    });
    // deleteFile();
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

export const loginDoctor = asyncHandler(async (req, res) => {
  const { email, mobile, password } = req.body;

  try {
    let doctor;

    // Check if the user exists with the provided email
    doctor = await Doctor.findOne({ mobile });

    if (doctor) {
      // If the user was not found by email, check with mobile
      doctor = await Doctor.findOne({ email });
    }

    if (doctor && doctor.password === password) {
      // Password is correct

      // Create JWT token
      const accessToken = jwt.sign(
        {
          doctorData: {
            doctorname: doctor.name,
            email: doctor.email,
            mobile: doctor.mobile,
            id: doctor.id,
          },
        },
        process.env.secretKey,
        { expiresIn: process.env.Range }
      );

      res.status(200).json({
        success: true,
        token: accessToken,
        doctorId: doctor.id,
      });
    } else {
      // User or password is wrong
      res
        .status(401)
        .json({ success: false, message: "User or Password is Wrong" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export const getDoctorById = asyncHandler(async (id) => {
  const success = await Doctor.findById(id).populate("doctorTimeDateId");
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
        .populate("doctorTimeDateId")
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
// export const updateDoctor = asyncHandler(async (req, res) => {
//   try {
//     const id = req.params.id;
//     const updatedData = req.body;

//     if (req.files && req.files.ProfilePicture) {
//       const file = req.files.ProfilePicture;
//       const result = await cloudinary.uploader.upload(file.tempFilePath);
//       updatedData.ProfilePicture = result.secure_url;
//     }

//     const updatedDoctor = await Doctor.findByIdAndUpdate(id, updatedData, {
//       new: true,
//     });

//     if (!updatedDoctor) {
//       return res.status(404).json({
//         success: false,
//         error: "Doctor not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       data: updatedDoctor,
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// });

import { v4 as uuidv4 } from "uuid";

export const updateDoctor = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = req.body;

    // Generate a random ID if not provided in the request body
    if (!updatedData.id) {
      updatedData.id = uuidv4();
    }

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

const deleteFile = () => {
  const __filename = new URL(import.meta.url).pathname;
  const _dirname = path.dirname(_filename);

  const dirPath = decodeURIComponent(
    path.join(__dirname, "../../tmp").slice(1).replace(/\\/g, "/")
  );

  if (fs.existsSync(dirPath)) {
    // Read the contents of the directory
    const files = fs.readdirSync(dirPath);

    // Iterate over the files and remove them
    files.forEach((file) => {
      const curPath = path.join(dirPath, file);
      fs.unlinkSync(curPath);
    });

    // Remove the empty directory
    fs.rmdirSync(dirPath);
  } else {
    console.log(`Directory '${dirPath}' does not exist.`);
  }
};
