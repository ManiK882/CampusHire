import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { getStudentProfile } from "../controllers/userController.js";

const router = express.Router();
router.get("/profile", verifyToken, getStudentProfile);

export default router;