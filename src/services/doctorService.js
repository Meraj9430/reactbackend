import asyncHandler from "express-async-handler";
import Doctor from "../modles/doctorsSchema.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dydfngksk",
  api_key: "398582974656751",
  api_secret: "32DlqJNslNvK9cGxW8Y-s6k08kI",
});

export const addDoctor = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    // const { Photo } = req.body;
    const {
      photo,
      registration,
      name,
      mobile,
      email,
      qualification,
      experience,
      gender,
      age,
      blood_group,
    } = req.body;

    const { house_street_no, colony_locality, city, state, country, pincode } =
      req.body;

    const { extra_mobile, languages, physical_info, virtual } = req.body;

    // const { medical_registration_proof, degree_proof, govt_id_proof } =
    //   req.body;

    // const uploadPhoto = req.body.Upload_Photo;

    const file = req.files.Photo;

    if (!file) {
      return res.status(400).json({
        success: false,
        error: "Photo is required.",
      });
    }

    // const file2 = req.files.Photo;

    // if (!file2) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Photo is required.",
    //   });
    // }

    // const file3 = req.files.Photo;

    // if (!file3) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Photo is required.",
    //   });
    // }

    // const file4 = req.files.Photo;

    // if (!file4) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Photo is required.",
    //   });
    // }

    // const file5 = req.files.Photo;

    // if (!file5) {
    //   return res.status(400).json({
    //     success: false,
    //     error: "Photo is required.",
    //   });
    // }

    // // Assuming cloudinary is used for image upload, modify this based on your setup
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    // const result2 = await cloudinary.uploader.upload(file2.tempFilePath);
    // const result3 = await cloudinary.uploader.upload(file3.tempFilePath);
    // const result4 = await cloudinary.uploader.upload(file4.tempFilePath);
    // const result5 = await cloudinary.uploader.upload(file5.tempFilePath);

    const doctor = await Doctor.create({
      // photo: result.secure_url,

      photo: result.secure_url,

      registration,
      name,
      mobile,
      email,
      qualification,

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

      // medical_registration_proof: result2.secure_url,
      // degree_proof: result3.secure_url,
      // govt_id_proof: result4.secure_url,

      // Upload_Photo: result5.secure_url,
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
