import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const database = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("database connect successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default database;
