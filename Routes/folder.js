import express, { Router } from "express";
import{ AuthMiddleware } from "../Middleware/authMiddle.js";
import { createFolder,getFolder ,deleteFolder} from "../controller/folder.js";

const router = Router();

router.post("/create", AuthMiddleware, createFolder);
router.get("/get", AuthMiddleware, getFolder);
router.delete("/delete/:folderId", AuthMiddleware, deleteFolder);



export default router;