import asyncHandler from "express-async-handler";
import { addUserAppointmentId, deleteUserAppointmentId, getUserAppointmentId, getUserAppointmentIdbyid, updateUserAppointmentId } from "../services/userAppointment.js";


export const AddUserAppointmentId = asyncHandler(async (req, res) => {
  const result = await addUserAppointmentId(req, res);
});

export const GetUserAppointmentId = asyncHandler(async (req, res) => {
        const result = await getUserAppointmentId(req, res);
      });

export const UpdateUserAppointmentId = asyncHandler(async (req, res) => {
        const result = await updateUserAppointmentId(req, res);
      });

      export const DeleteUserAppointmentId = asyncHandler(async (req, res) => {
        const result = await deleteUserAppointmentId(req, res);
      });

      export const GetUserAppointmentIdbyid = asyncHandler(async (req, res) => {
        const result = await getUserAppointmentIdbyid(req, res);
      });