const User = require("../models/User");
const authService = require("../services/auth.service");
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  const verify = await authService.login(user, password);

  if (!verify.error) {
    return res.json(verify);
  }

  return res.status(400).json(verify);
};
const forgotPassword = async (req, res) => {};
const resetPassword = async (req, res) => {};


module.exports = { login, forgotPassword, resetPassword };
