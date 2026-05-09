import xlsx from "xlsx";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import User from "../models/User.js";
export const uploadStudentEmails = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const workbook = xlsx.read(req.file.buffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    const sheetData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    const emails = sheetData.map(
      (row) => row.email || row.Email || row["E-mail"]
    );
    console.log(emails);
    const uniqueEmails = [...new Set(emails)];

    await Promise.all(
      uniqueEmails.map(async (email) => {
        if (!email) return;

        const token = jwt.sign(
          { email },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        const registerLink = `${process.env.CLIENT_URL}/register/${token}`;

        await sendEmail(email, registerLink);
      })
    );

    res.status(200).json({
      message: "Registration links sent successfully",
      totalEmails: uniqueEmails.length,
    });

  } catch (error) {
    console.log("UPLOAD ERROR:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const uploadPlacedStudents = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    // Read Excel
    const workbook = xlsx.read(req.file.buffer, {
      type: "buffer",
    });

    const sheetName = workbook.SheetNames[0];

    const sheetData = xlsx.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );

    let updatedStudents = 0;

    for (const row of sheetData) {

      // Normalize Excel data
      const email = row.email?.trim().toLowerCase();

      const name = row.name?.trim().toLowerCase();

      const course = row.course?.trim().toLowerCase();

      const branch = row.branch?.trim().toLowerCase();

      // Find matching student
      const student = await User.findOne({
        email: { $regex: new RegExp(`^${email}$`, "i") },

        name: { $regex: new RegExp(`^${name}$`, "i") },

        course: { $regex: new RegExp(`^${course}$`, "i") },

        branch: { $regex: new RegExp(`^${branch}$`, "i") },
      });

      if (student) {

        student.placed = true;

        await student.save();

        updatedStudents++;
      }
    }

    res.status(200).json({
      message: "Placed students updated successfully",
      totalUpdated: updatedStudents,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};