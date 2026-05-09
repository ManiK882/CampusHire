import express from "express";
import { createAdmin } from "../controllers/createAdmin.js";

const router = express.Router();

router.post("/create-admin",createAdmin);

export default router;