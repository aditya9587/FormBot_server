import express from "express";
import { AuthMiddleware } from "../Middleware/authMiddle.js";
import { createForm , getForm , fetchFormById, updateForm} from "../controller/form.js";


const router = express.Router();

router.post("/formCreate",AuthMiddleware, createForm)

router.get("/formGet",AuthMiddleware, getForm)

router.get("/formData/:formId",AuthMiddleware, fetchFormById);

router.put("/formUpdate/:formId",AuthMiddleware, updateForm);











export default router;