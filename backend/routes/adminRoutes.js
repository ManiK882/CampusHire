import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import { uploadStudentEmails ,uploadPlacedStudents} from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/upload-emails",
  upload.single("file"),
  uploadStudentEmails
);


router.post(
  "/upload-placed",
  upload.single("file"),
  uploadPlacedStudents
);


export default router;