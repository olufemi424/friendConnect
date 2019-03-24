const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

//load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

//load User model
var User = require("../models/Users");

//@route GET api/users/test
//@des users post Route
//@access Public
exports.user_test = (req, res) => res.json({ msg: "Users Works" });

//@route GET api/users/register
//@des  Register user
//@access Public
exports.user_signup = (req, res) => {
  //validate req input
  const { errors, isValid } = validateRegisterInput(req.body);

  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  errors.email = "Email Already Exist";

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json(errors);
    } else {
      //avatar
      const avatar = gravatar.url(req.body.email, {
        s: "200", //size
        r: "pg", //rating
        d: "mm" //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      //hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save() //save to db
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
};

//@route GET api/users/login
//@des  Login user /  return JWT Token
//@access Public
exports.user_login = (req, res) => {
  //validate req input
  const { errors, isValid } = validateLoginInput(req.body);

  //check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find user by email
  User.findOne({ email }).then(user => {
    //Check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched
        //create jwt payload
        const payload = { id: user.id, name: user.name, avatar: user.avatar };

        //Sign Toekn
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
        // res.json({ msg: "Success" });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
};

//@route GET api/users/current
//@des  Return current user
//@access Private
//accessing protected routes
exports.user_get_current_user = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    avatar: req.user.avatar,
    date: req.user.date,
    profileavatar: req.user.profileavatar
  });
};
