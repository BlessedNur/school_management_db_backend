const User = require("../models/User");
const userService = require("../services/user.service");

const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" });
    res.status(200).json(instructors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).lean();
    const instructors = await User.find({ role: "instructor" }).lean();

    res.status(200).json({ students, instructors });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteInstructor = async (req, res) => {
  const instructorId = req.params.id;

  try {
    const instructor = await User.findByIdAndDelete(instructorId);

    if (!instructor) {
      return res.status(404).json({ message: "Instructor not found" });
    }

    res.status(200).json({ message: "Instructor deleted successfully" });
  } catch (error) {
    console.error("Error deleting instructor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  const studentId = req.params.id;

  try {
    const student = await User.findByIdAndDelete(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, role, enrollmentDate } = req.body;
    const userExists = await userService.verifyIfUserIsUnique(email);

    if (userExists?.success === false) {
      return res.status(400).json({ message: "Email already exists." });
    }

    if (role !== "student") {
      const password = userService.generateInstructorPassword();
      const hashedPassword = await userService.hashpassword(password);
      const user = new User({
        name,
        email,
        role,
        password: hashedPassword,
      });
      userService.sendEmail(email, name, password);

      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } else if (role === "student") {
      const user = new User({
        name,
        email,
        role,
        enrollmentDate,
      });
      await user.save();
      res.status(201).json({ message: "User created successfully", user });
    } else {
      res.status(400).json({ message: "Invalid role." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

module.exports = {
  addUser,
  getInstructors,
  getStudents,
  getUsers,
  deleteInstructor,
  deleteStudent,
};
