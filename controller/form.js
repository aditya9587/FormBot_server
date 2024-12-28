import { Form } from "../Models/form.js";

export const createForm = async (req,res) => {
  try {
    const{ fileName, selectedFolderId } = req.body;

    if(!fileName || !selectedFolderId){
      return res.status(400).json({ message: "Form name and folder ID are required" });
    }

    const form = new Form({ formName: fileName, userId: req.user.userId, folderId: selectedFolderId });
    await form.save();

    return res.status(201).json({ message: "Form created successfully", form });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getForm = async (req, res) => {
  try {
    const forms = await Form.find({ userId: req.user.userId });
    return res.status(200).json(forms);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};