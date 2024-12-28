import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  }
});

export const Folder = mongoose.model("Folder", folderSchema);
