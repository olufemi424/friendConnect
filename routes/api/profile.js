const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//load profile Model
const Profile = require("../../models/Profile");
//load profile Model
const User = require("../../models/Users");

//@route GET api/profile/test
//@des Test profile Rout
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//@route GET api/profile/
//@des Get current user profile
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
