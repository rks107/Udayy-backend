const express = require("express");
const router = express.Router();
const passport = require("passport");

//USER CONTROLLER
const usersController = require("../controllers/users_controller");

// FOR CREATING NEW USER
router.post("/signup", usersController.create);

// FOR DELETING USER WITH GIVING ID IN PARAMS
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  usersController.destroy
);

// FOR GETING INFORMATION ABOUT PERTICULER USER
router.get(
  "/profile/:id",
  usersController.profile
);

// FOR CREATING SESSION
router.post("/login", usersController.createSession);

module.exports = router;