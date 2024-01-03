import express from "express";
// import cron from "node-cron";
// import axios from "axios";
import database from "./config/mongodb.js";
import routes from "./routes/index.js";
import fileUpload from "express-fileupload";

// import { errorHandler } from "./helpers/errorHandler.js";
// import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
database();
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser())

// app.use("/",(req,res)=>{
//     res.send("hello from server side")
// })
app.use("/api", routes);
// app.use(errorHandler);

// app.use('/receipts', express.static(process.cwd() + '/receipts'))

// cron.schedule('*/15 * * * *', async () => {
//   try {
//     const response = await axios.get('https://inventory-phsl.onrender.com/api/dumy/getDummy');
//     console.log("API call successful:", response.data);
//   } catch (error) {
//     console.error("Error making API call:", error.message);
//   }
// });
// cron.schedule('*/15 * * * *', () => {
//   console.log("app running");
// })

app.use((req, res, next) => {
  res.status(404).json({
    error: "bad request",
  });
});

export default app;
