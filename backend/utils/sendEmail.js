import nodemailer from "nodemailer";

const sendEmail = async (to, registerLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Student Registration Link",
      html: `
        <h3>Campus Job Management System</h3>
        <p>Click below to register:</p>
        <a href="${registerLink}">${registerLink}</a>
      `,
    });

    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.log("Email Error:", error.message);
  }
};

export default sendEmail;