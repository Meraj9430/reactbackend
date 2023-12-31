import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserSignup_login" },
  appointmentId: String,
});

export default mongoose.model("DoctorUserAppointment", appointmentSchema);
