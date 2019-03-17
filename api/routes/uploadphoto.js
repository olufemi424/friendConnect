const express = require("express");
const router = express.Router();
const passport = require("passport");
const mongoose = require("mongoose");
var fs = require("fs");

//load profile Model
const Profile = require("../models/Profile");
//load user Model
const User = require("../models/Users");

//file upload
const multer = require("multer");

// file storage
const storage = multer.diskStorage({
  //configuration
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  //file name
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (res, file, cb) => {
  //reject file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true); //accept file time
  } else {
    cb(null, false); //decline any other file type
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
});

//@route GET api/upload
//@des testing
//@access Public
router.get("/", (req, res) => res.json({ msg: "Upload Works" }));

//@route GET api/upload/photo
//@des users post Route
//@access Public
router.post(
  "/photo",
  upload.single("profileImage"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    User.findOne({ _id: req.user._id })
      .populate("user", ["name", "avatar"]) //populate from users
      .then(user => {
        //new path to photo uploaded
        const newUserPhoto = {
          photo: req.protocol + "://" + req.get("host") + "/" + req.file.path
        };
        //if not user return error
        if (!user) {
          errors.nouser = "There is no user found";
          return res.status(404).json(errors);
        }

        //put the photo first
        user.profileavatar.unshift(newUserPhoto);

        //save to db
        user.save().then(user => res.json(user));
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route DELETE api/upload/photo:photoId
//@des delete experience from profile
//@access Private route
router.delete(
  "/photo/:photoId",
  upload.single("profileImage"),
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    // User.findOne({ _id: req.user._id })
    //   .then(user => {
    //delete photo from db
    // user.profileavatar.remove(req.params.photoId);
    // const filePath = req.file;
    // fs.unlinkSync(filePath);
    // save
    // profile.save().then(user => res.json(user));
    // res.json(user);
    // })
    // .catch(err => res.status(404).json(err));

    // const fullUrl = req.protocol + "://" + req.get("host");
    // // + req.originalUrl;
    // console.log(fullUrl);

    User.findById({ _id: req.user._id })
      .then(user => console.log([req.params.photoId]))
      .catch(err => console.log(err));
  }
);

module.exports = router;
