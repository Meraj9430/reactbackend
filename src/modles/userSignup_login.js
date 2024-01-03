import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  FirstName: String,
  Email: String,
  Mobile: String,
  City: String,
  Referral: String,
  Password: String,
});

export default mongoose.model("UserSignup_login", userSchema);
