const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// load validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");

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
      .populate("user", ["name", "avatar"]) //populate from users
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

//@route GET api/profile/all/  //backend api route for all users
//@des get profile user  by ID
//@access Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noProfile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.status(200).json(profiles);
    })
    .catch(err => res.status(404).json({ Profile: "There are no profiles" }));
});

//@route GET api/profile/handle/:handle  //backend api route
//@des get profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//@route GET api/profile/users/:user_id/  //backend api route
//@des get profile user  by ID
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      }
      res.status(200).json(profile);
    })
    .catch(err =>
      res.status(404).json({ Profile: "There is no profile for this user" })
    );
});

//@route POST api/profile/
//@des create OR Edit user profile
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;

    //skills - split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    //Socials
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // update
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // create

        //Check if the handle exist
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That habdle already exist";
            res.status(400).json(errors);
          }

          //create new profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//@route POST api/profile/experience
//@des Add experience
//@access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);
    //check validation
    if (!isValid) {
      //return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };
      //Add to experience array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

module.exports = router;
