import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
});

export default mongoose.model("DoctorSignup_login", userSchema);
