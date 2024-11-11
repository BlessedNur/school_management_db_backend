const { Schema, model } = require("mongoose");
const scheduleSchema = new Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Instructor",
    required: true,
  },
});
module.exports = model("Schedule", scheduleSchema);
