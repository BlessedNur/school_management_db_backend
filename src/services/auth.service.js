const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Hash comparison function
const hashCompare = async (value, hash) => {
  try {
    return await bcrypt.compare(value, hash);
  } catch (error) {
    console.error("Error comparing hash:", error); // Log the error for better debugging
    return false;
  }
};

// Login function
const login = async (user, password) => {
  const compare = await hashCompare(password, user.password);
  if (!compare) {
    return {
      error: true,
      message: "Invalid email or password.",
    };
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return {
    error: false,
    message: "Login successful.",
    token: token,
  };
};

module.exports = {
  hashCompare,
  login,
};
