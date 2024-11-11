const User = require("../models/User");
const isLogin = (req, res, next) => {};
const IsAdmin = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (user && user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Unauthorized access" });
  }
};

module.exports = {
  isLogin,
  IsAdmin,
};
