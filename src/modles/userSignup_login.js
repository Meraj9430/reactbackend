import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // roleId: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  FirstName: String,
  Mobile: String,
});

export default mongoose.model("UserSignup_login", userSchema);
