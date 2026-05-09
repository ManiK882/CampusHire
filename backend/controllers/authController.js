import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const {
      name,
      registrationNo,
      course,
      branch,
      finalYear,
      password,
      token,
    } = req.body;

    // Verify invite token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract email from token
    const email = decoded.email;

    // Check if email already exists
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({
        message: "User already registered with this email",
      });
    }

    // Check registration number duplicate
    const existingRegNo = await User.findOne({ registrationNo });

    if (existingRegNo) {
      return res.status(400).json({
        message: "Registration number already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    const user = await User.create({
      name,
      registrationNo,
      email,
      course,
      branch,
      finalYear,
      password: hashedPassword,
      role: "student",
      verified: true,
    });

    res.status(201).json({
      message: "Student registration successful",
      user,
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid or expired registration token",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(404).json({
        message: `${role} not found`,
      });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res
  .cookie("token", token, {
    httpOnly: true,     
    secure: false,      
    sameSite: "Lax",    
    maxAge: 1 * 24 * 60 * 60 * 1000, 
  })
  .status(200)
  .json({
    message: `${role} login successful`,
    user,
  });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const logoutUser = (req, res) => {
  res
    .clearCookie("token")
    .json({ message: "Logged out successfully" });
};

export const checkAuth = (req, res) => {
  if (!req.user) {
    return res.status(401).json({
      isAuthenticated: false,
    });
  }

  res.status(200).json({
    isAuthenticated: true,
    user: req.user,
  });
};