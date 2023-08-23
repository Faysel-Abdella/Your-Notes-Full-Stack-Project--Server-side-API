const express = require("express");

const router = express.Router();

const validationFunctions = require("../middlewares/validationMiddleware");

const userController = require("../controllers/userController");

router.post(
  "/user/signup",
  validationFunctions.validateSignupInput,
  userController.signup
);

module.exports = router;
