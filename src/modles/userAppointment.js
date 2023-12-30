import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserSignup_login" },
  date: { type: String },
  status: { type: String, default: "pending" },
  time: { type: String },
  userAppointmentId: { type: String },
});

export default mongoose.model("UserAppointment", appointmentSchema);
