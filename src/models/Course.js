const { Schema, model, Types } = require("mongoose");

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
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
    startFrom: {
      type: String,
      reguired: true,
    },
    endAt: {
      type: String,
      reguired: true,
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
