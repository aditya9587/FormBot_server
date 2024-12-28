import mongoose from "mongoose";

const formSchema = new mongoose.Schema({
  formName: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  formSequence: {
    type: Array,
  },
  formhits:{
    type: Number,
    default : 0,
  },
  folderId: {
    type: mongoose.Schema.ObjectId,
    ref: "Folder",
  },
  formResponse: {
    type: Array,
  },

});

export const Form = mongoose.model("Form", formSchema);
