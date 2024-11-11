const verifyUser = (req, res, next) => {
  const { name, email, role, enrollmentDate } = req.body;
  if (!name || !email || !role) {
    res.status(400).json({ message: "Please provide all fields" });
    return;
  }
  next();
};

module.exports = {
  verifyUser,
};
