const express = require("express");
const router = express.Router();
const passport = require("passport");

//User controller
const UserController = require("../controller/user");

//@route GET api/users/test
router.get("/test", UserController.user_test);

//@route GET api/users/register
router.post("/register", UserController.user_signup);

//@route GET api/users/login
router.post("/login", UserController.user_login);

//@route GET api/users/current
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  UserController.user_get_current_user
);

module.exports = router;
