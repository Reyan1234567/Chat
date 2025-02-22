import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connect } from "./config/db.js";
import routes from "./routes/router.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("server listening on " + process.env.PORT);
  connect();
});
