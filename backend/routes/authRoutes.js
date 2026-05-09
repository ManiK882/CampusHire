import express from "express";
import { checkAuth, logoutUser, registerUser } from "../controllers/authController.js";
import { loginUser } from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);
router.get("/check",verifyToken,checkAuth);
export default router;