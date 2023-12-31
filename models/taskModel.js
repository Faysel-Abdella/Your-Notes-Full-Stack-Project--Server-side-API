const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: "false",
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
