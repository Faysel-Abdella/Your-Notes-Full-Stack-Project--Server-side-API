const express = require("express");

const router = express.Router();

// ########## import validation middlewares ################# //

const { validateFirstSignup } = require("../middlewares/validationMiddleware");
const {
  validateCompleteSignupInput,
} = require("../middlewares/validationMiddleware");
const { validateLoginInput } = require("../middlewares/validationMiddleware");

// ########## import controllers ################# //

const userController = require("../controllers/authController");

const { firstSignup } = require("../controllers/authController");
const { completeSignup } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const { logout } = require("../controllers/authController");

router.post("/first-signup", validateFirstSignup, firstSignup);

router.post("/complete-signup", validateCompleteSignupInput, completeSignup);

router.post("/auth/login", validateLoginInput, login);

router.get("/auth/logout", logout);

module.exports = router;
