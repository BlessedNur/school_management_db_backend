const { Schema, model, Types } = require("mongoose");

const courseSchema = new Schema(
  {
    category: {
      type: String,
      enum: [
        "Web development",
        "Cyber security",
        "Graphic design",
        "Digital marketing",
      ],
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    enrolledStudents: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    enrolledInstructors: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Course", courseSchema);
