import http from "http";
import app from "./app.js";
const server = http.createServer(app);
import { PORT } from "./config/config.js";

server.listen(PORT, () => {
  console.log(`server Start on ${PORT}`);
});
