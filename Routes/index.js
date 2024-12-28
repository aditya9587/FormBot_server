import { Router } from "express";
import { signup, login } from "../controller/index.js";
import { AuthMiddleware } from "../Middleware/authMiddle.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);


export default router;