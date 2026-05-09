import User from "../models/User.js";

export const getStudentProfile = async (req, res) => {
  try {
    //  user id comes from token (middleware)
    const userId = req.user.id;

    const student = await User.findById(userId).select("-password");
    
    
    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.status(200).json(student);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};