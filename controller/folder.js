import { Folder } from "../Models/folder.js";

export const createFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    if (!folderName) {
      return res.status(400).json({ message: "Folder name is required" });
    }
    const folderData = new Folder({
       folderName,
      userId: req.user.userId,
    });
    await folderData.save();
    return res.status(200).json({ message: "Folder created successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export  const getFolder = async (req, res) => {
  try {
    const folders = await Folder.find({ userId: req.user.userId });
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}

export const deleteFolder = async (req, res) => {
  try {
    const { folderId } = req.params;
    const deletedFolder = await Folder.findByIdAndDelete({_id: folderId});
    if (!deletedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    return res.status(200).json({ message: "Folder deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
}