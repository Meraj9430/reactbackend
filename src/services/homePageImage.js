import asyncHandler from "express-async-handler";
import Image from "../modles/userHome/homepageImage.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: "dydfngksk",
  api_key: "398582974656751",
  api_secret: "32DlqJNslNvK9cGxW8Y-s6k08kI",
});

export const addImage = asyncHandler(async (req, res) => {
  console.log(req.body);
  try {
    const { photo, photo2, photo3, photo4 } = req.body;

    let profilePictureUrl = "";
    let profilePictureUrl2 = "";
    let profilePictureUrl3 = "";
    let profilePictureUrl4 = "";
    //     let profilePictureUrl5 = "";

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
    //     if (req.files && req.files.Photo5) {
    //       const file = req.files.Photo5;
    //       const result = await cloudinary.uploader.upload(file.tempFilePath);
    //       profilePictureUrl5 = result.secure_url;
    //     }

    const image = await Image.create({
      photo: profilePictureUrl,
      photo2: profilePictureUrl2,
      photo3: profilePictureUrl3,
      photo4: profilePictureUrl4,
      //       photo5: profilePictureUrl5,
    });
    //     deleteFile();
    res.status(201).json({
      success: true,
      data: image,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

export const getImageById = asyncHandler(async (id) => {
  const success = await Image.findById(id);
  console.log(success);
  return success;
});

export const getImage = asyncHandler(
  async (paginationOptions, filter, sort) => {
    try {
      const { page, size } = paginationOptions;
      const totalDocuments = await Image.countDocuments(filter);
      const totalPages = Math.ceil(totalDocuments / size);
      const skip = (page - 1) * size;

      const collation = {
        locale: "en",
        strength: 2,
      };

      const success = await Image.find(filter)
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
export const deleteimage = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const success = await Image.findByIdAndDelete(id);
  if (success) {
    res.status(200).send({ success, message: "Ok deleted ......" });
  } else {
    res.status(404).send({ massage: "ID not found " });
    return { error: "not deleted..." };
  }
});
export const updateImage = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    if (req.files && req.files.ProfilePicture) {
      const file = req.files.ProfilePicture;
      const result = await cloudinary.uploader.upload(file.tempFilePath);
      updatedData.ProfilePicture = result.secure_url;
    }

    const updatedImage = await Image.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedImage) {
      return res.status(404).json({
        success: false,
        error: "Image not found",
      });
    }
    //     deleteFile()
    res.status(200).json({
      success: true,
      data: updatedImage,
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
