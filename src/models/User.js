const { Schema, model } = require("mongoose");
const Student = require("./Student");
const Instructor = require("./Instructor");
const Admin = require("./Admin");

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["student", "instructor", "admin"],
      required: true,
    },
    enrollmentDate: {
      type: Date,
      required: function () {
        return this.role === "student";
      },
    },
    password: {
      type: String,
      required: function () {
        return this.role !== "student";
      },
    },
  },
  { timestamps: true }
);

userSchema.post("save", async function (doc, next) {
  try {
    if (doc.role === "student") {
      const existingStudent = await Student.findOne({ user: doc._id });
      if (!existingStudent) {
        await Student.create({
          user: doc._id,
        });
      }
    }
    if (doc.role === "admin") {
      await Admin.create({
        user: doc._id,
      });
    }

    if (doc.role === "instructor") {
      const existingInstructor = await Instructor.findOne({ user: doc._id });
      if (!existingInstructor) {
        await Instructor.create({ user: doc._id });
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = model("User", userSchema);
