import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import router from "./Routes/index.js";
import folderRouter from "./Routes/folder.js";
import formRouter from "./Routes/form.js";

const app = express();
dotenv.config();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect(process.env.MONGODBURI).then(() => {
  console.log("Connected to MongoDB");
});



app.get("/", (req, res) => {
  res.send("Hello World!");
}); 

app.use("/api/", router)
app.use("/api/folder", folderRouter)
app.use("/api/form", formRouter)

app.listen(process.env.PORT, () => {  
  console.log(`Example app listening on port ${process.env.PORT}`);
});
