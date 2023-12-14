import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  specialization: {
    type: String,
  },
  description: {
    type: String,
  },
  photo: {
    type: String,
  },
  city: {
    type: String,
  },

  experience: {
    type: String,
  },
  availableDays: {
    type: String,
  },
  availableTime: {
    type: String,
  },
  fee: {
    type: Number,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

export default mongoose.model("Doctor", doctorSchema);
