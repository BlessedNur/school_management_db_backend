const User = require("../models/User");
const authService = require("../services/auth.service");

const register = async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: true, message: "Email already exists." });
    }
    const hashedPassword = await authService.hashpassword(password);

    if (role === "student") {
      const enrollDate = new Date().toDateString();
      const newUser = new User({
        name,
        email,
        role,
        enrollmentDate: enrollDate,
        password: hashedPassword,
      });
      await newUser.save();
    } else if (role !== "student") {
      const newUser = new User({
        name,
        email,
        role,
        password: hashedPassword,
      });
      await newUser.save();
    }

    return res.json({ error: false, message: "User registered successfully." });
  } catch (err) {
    console.error("Registration error:", err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(401)
        .json({ error: true, message: "Invalid email or password." });
    }

    const verify = await authService.login(user, password);

    if (!verify.error) {
      return res.json({
        error: false,
        message: "Login successful.",
        user,
        token: verify.token,
      });
    }

    return res.status(400).json({ verify });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ error: true, message: "Internal server error." });
  }
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { login, forgotPassword, resetPassword, register };
