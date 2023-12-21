import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  photo: { type: String },
  photo2: { type: String },
  photo3: { type: String },
  photo4: { type: String },
  //   photo5:{type:String}
});

export default mongoose.model("homePageImage", imageSchema);
