import express from "express";
import { AuthMiddleware } from "../Middleware/authMiddle.js";
import { createForm , getForm} from "../controller/form.js";


const router = express.Router();

router.post("/formCreate",AuthMiddleware, createForm)

router.get("/formGet",AuthMiddleware, getForm)











export default router;