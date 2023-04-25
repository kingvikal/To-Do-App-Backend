import express from "express";
import taskRoute from "./Routes/task.route.js";
import dotenv from "dotenv";
import { dbConnect } from "./Mongo/dbConnect.js";

const app = express();
dotenv.config();
app.use(express.json());

app.use("/api", taskRoute);

dbConnect();
 

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
});
