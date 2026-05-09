import Job from "../models/Job.js";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";

export const createJob = async (req, res) => {
  try {
    const {
      companyName,
      role,
      ctc,
      year,
      course,
      formLink,
      eligibleBranches,
    } = req.body;
   
    if (
      !companyName ||
      !role ||
      !ctc ||
      !year ||
      !formLink||
       !course?.length ||
  !eligibleBranches?.length
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const coursesArray = Array.isArray(course) ? course : [course];
    // Save job
    const job = await Job.create({
      companyName,
      role,
      ctc,
      year,
      course: coursesArray,
      formLink,
      eligibleBranches,
      createdBy: req.user?.id || null,
    });

    //  Filter by BOTH course and branch
    
    const students = await User.find({
      role: "student",
      placed: false,
      finalYear: year,//from req.body
      course: { $in: coursesArray },
      branch: { $in: eligibleBranches },
    });

    await Promise.all(
      students.map((student) =>
        transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: student.email,
          subject: `New Job Opportunity: ${companyName}`,
          html: `
        <h2>New Placement Opportunity</h2>
        <p><strong>Company:</strong> ${companyName}</p>
        <p><strong>Role:</strong> ${role}</p>
        <p><strong>CTC:</strong>${ctc}</p>
        <p><strong>Year:</strong>${year}</p>
        <p><strong>Course:</strong> ${coursesArray.join(", ")}</p>
        <p><strong>Eligible Branches:</strong> ${eligibleBranches.join(", ")}</p>
        <p><a href="${formLink}" target="_blank">Apply Here</a></p>
      `,
        })
      )
    );

    res.status(201).json({
      message: students.length > 0
          ? "Job posted & emails sent"
          : "Job posted but no matching students found",
      totalStudentsNotified: students.length,
    });

  } catch (error) {
    console.error("JOB ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getJobsByBranch = async (req, res) => {
  try {

    const { branch } = req.params;
    
    // Find jobs where branch exists in eligibleBranches array
    const jobs = await Job.find({
      eligibleBranches: branch
    }).sort({ createdAt: -1 });

    
    res.status(200).json({
      success: true,
      totalJobs: jobs.length,
      jobs
    });

  } catch (error) {

    console.log("BRANCH JOB ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};