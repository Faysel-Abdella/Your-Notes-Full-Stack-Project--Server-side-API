const express = require("express");

const router = express.Router();

const validationFunctions = require("../middlewares/validationMiddleware");

const userController = require("../controllers/userController");

router.post(
  "/user/complete-signup",
  validationFunctions.validateCompleteSignupInput,
  userController.completeSignup
);

module.exports = router;
