const User = require("../models/User");
const Admin = require("../models/Admin");
const Instructor = require("../models/Instructor");
const Student = require("../models/Student");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const hashpassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
const sendEmail = async (email, name, password) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Your Instructor Account Password",
    text: `Hello ${name},\n\nYour account has been created. Here is your login password: ${password}\nPlease change it upon first login for security.\n\nBest Regards,\nYour Team`,
  });
};
const generateInstructorPassword = () => {
  const characters = "0123456789";
  let password = "";
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
};
const verifyIfUserIsUnique = async (email) => {
  const user = await User.findOne({ email: email });
  if (user) {
    return {
      success: false,
      message: "Email already exists",
    };
  }
  return {
    success: true,
    message: "Email is unique",
  };
};

module.exports = {
  generateInstructorPassword,
  sendEmail,
  hashpassword,
  verifyIfUserIsUnique,
};
