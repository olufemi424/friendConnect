const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const ProfileController = require("../controller/profile");

//@route GET api/profile/test
//@access Public
router.get("/test", ProfileController.profile_testing);

//@route GET api/profile/
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_get_current_profile
);

//@route GET api/profile/all/  //backend api route for all users
//@access Public
router.get("/all", ProfileController.profile_get_all_profile);

//@route GET api/profile/handle/:handle  //backend api route
//@access Public
router.get("/handle/:handle", ProfileController.profile_get_single_profile);

//@route GET api/profile/users/:user_id/  //backend api route
//@access Public
router.get("/user/:user_id", ProfileController.profile_get_profile_user);

//@route POST api/profile/
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_create_profile
);

//@route POST api/profile/experience
//@access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_add_experience
);

//@route POST api/profile/education
//@access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_add_education
);

//@route DELETE api/profile/experience/:exp_id
//@access Private route
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_delete_experience
);

//@route DELETE api/profile/education/:exp_id
//@access Private route
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_delete_education
);

//@route DELETE api/profile
//@access Private route
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  ProfileController.profile_delete_profile
);

module.exports = router;

// lists of routes and their get function
//@route GET api/profile/test
//@route GET api/profile/  //for current user auth:true
//@route GET api/profile/all/  auth:false
//@route GET api/profile/handle/:handle  // auth:false profile by handle
//@route GET api/profile/users/:user_id/ //auth:false profile by id

//POST
//@route POST api/profile/  //update/eidt profile //auth:true
//@route POST api/profile/experience auth:true
//@route POST api/profile/education auth:true

//DELETE
//@route DELETE api/profile/experience/:exp_id auth:true
//@route DELETE api/profile/education/:exp_id  auth true
//@route DELETE api/profile  //delete profile
