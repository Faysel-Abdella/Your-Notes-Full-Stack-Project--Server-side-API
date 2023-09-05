const mongoose = require("mongoose");

const jwt = require("jsonwebtoken");

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

userSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

module.exports = mongoose.model("User", userSchema);
