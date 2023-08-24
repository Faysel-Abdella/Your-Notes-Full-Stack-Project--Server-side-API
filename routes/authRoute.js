const express = require("express");

const router = express.Router();

const validationFunctions = require("../middlewares/validationMiddleware");

const userController = require("../controllers/authController");

router.post(
  "/complete-signup",
  validationFunctions.validateCompleteSignupInput,
  userController.completeSignup
);

router.post(
  "/auth/login",
  validationFunctions.validateLoginInput,
  userController.login
);

router.get("/auth/logout", userController.logout);

module.exports = router;
