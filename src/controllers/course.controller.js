const Course = require("../models/Course");

const addCourse = async (req, res) => {
  try {
    const { name, category, startFrom, endAt } = req.body;
    const existingCourse = await Course.findOne({ name });
    if (existingCourse) {
      return res.status(400).json({ error: `Course ${name} already exists` });
    }

    const newCourse = new Course({
      name,
      category,
      startFrom,
      endAt,
    });
    await newCourse.save();
    res.json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error deleting course:", error);
    res.status(500).json({ error: "Server error" });
  }
};
const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const body = req.body;
    await Course.findByIdAndUpdate(courseId, { ...body });
    res.status(200).json({ message: "Course updated succesfully" });
  } catch (err) {
    res.status(404).json({ message: "Course not found" });
    console.log(err);
  }
};

const enroll = async (req, res) => {
  const { courseId, studentIds, instructorIds } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const alreadyEnrolledStudents = studentIds.filter((studentId) =>
      course.enrolledStudents.includes(studentId)
    );

    const alreadyEnrolledInstructors = instructorIds.filter((instructorId) =>
      course.enrolledInstructors.includes(instructorId)
    );

    if (
      alreadyEnrolledStudents.length > 0 ||
      alreadyEnrolledInstructors.length > 0
    ) {
      return res.status(400).json({
        error: {
          alreadyEnrolledStudents,
          alreadyEnrolledInstructors,
        },
      });
    }

    course.enrolledStudents.push(...studentIds);
    course.enrolledInstructors.push(...instructorIds);

    await course.save();

    res.status(200).json({
      message: "Enrollment successful",
      course,
    });
  } catch (error) {
    console.error("Error enrolling users:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addCourse, getCourse, deleteCourse, enroll, updateCourse };
