import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import createAdminRoutes from "./routes/createAdminRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import userRoutes from "./routes/userRoutes.js";
connectDB();

const app = express();
app.set("trust proxy", 1);
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); 

app.use("/api/admin",adminRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/cAdmin",createAdminRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/student",userRoutes);
app.listen(PORT,()=>{
    console.log("Server is running");
})