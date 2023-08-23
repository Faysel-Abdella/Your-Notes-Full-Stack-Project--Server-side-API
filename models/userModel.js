const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },

  password: {
    type: String,
  },

  username: {
    type: String,
  },

  phone: {
    type: Number,
  },
  birthdayYear: {
    type: Number,
  },
});

module.exports = mongoose.model("User", userSchema);
