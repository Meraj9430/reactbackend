import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  days: {
    type: [String], // An array of strings representing days
  },
  start_time: {
    type: String,
  },
  end_time: {
    type: String,
  },
  fee: {
    type: String,
  },
  morning: {
    type: [String],
  },
  afternoon: {
    type: [String],
  },
  evening: {
    type: [String],
  },
});

export default mongoose.model("Doc_Fee_Time", scheduleSchema);
