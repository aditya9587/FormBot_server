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

export const fetchFormById = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({ message: "Form ID is required" });
    }

    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json(form);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  } 
};

export const updateForm = async (req, res) => {
  try {
    const { formId } = req.params;
    const { formName , formSequence} = req.body;
    console.log("formSequence",formSequence);
    if (!formId) {
      return res.status(400).json({ message: "Form ID is required" });
    }

    const updatedForm = await Form.findByIdAndUpdate(
      formId,
      { formName, formSequence }, 
      { new: true }
    );

    if (!updatedForm) { 
      return res.status(404).json({ message: "Form not found" });
    }

    return res.status(200).json({ message: "Form updated successfully", form: updatedForm });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};