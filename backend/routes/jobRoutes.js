import express from "express";
import { createJob, getJobsByBranch ,} from "../controllers/jobController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { isAdmin } from "../middlewares/roleMiddleware.js";
const router = express.Router();

// Create job route
router.post("/create", verifyToken,isAdmin,createJob);
router.get(
  "/branch/:branch",
  getJobsByBranch
);

export default router;