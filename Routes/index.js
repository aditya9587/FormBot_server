import { Router } from "express";
import { signup, login,getUserDetails, updateUserDetails } from "../controller/index.js";
import { AuthMiddleware } from "../Middleware/authMiddle.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.put("/update", AuthMiddleware, updateUserDetails);

router.get("/user", AuthMiddleware, getUserDetails);


export default router;