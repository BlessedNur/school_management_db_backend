const { Schema, model } = require("mongoose");

const instructorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = model("Instructor", instructorSchema);
