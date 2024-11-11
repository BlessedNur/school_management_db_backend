const { Schema, model } = require("mongoose");
const adminSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = model("Admin", adminSchema);
