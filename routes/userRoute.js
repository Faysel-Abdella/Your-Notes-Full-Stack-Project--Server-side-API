const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userController");

const validationFunctions = require("../middlewares/validationMiddleware");

router.get("/user/current-user", userControllers.getCurrentUser);
router.post("/user/verify", userControllers.verifyUser);

router.patch(
  "/user/update-user",
  validationFunctions.validateUpdateUserInput,
  userControllers.updateUser
);

module.exports = router;
