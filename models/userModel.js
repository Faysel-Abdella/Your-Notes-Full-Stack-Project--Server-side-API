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
  birthDayYear: {
    type: Number,
  },
});

//Create a function to return the user with out its password
userSchema.methods.withOutPassword = function () {
  //Must use function key word
  let obj = this.toObject();
  //this refer to the user created base on this Schema model
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
