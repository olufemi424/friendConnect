const express = require("express");
const router = express.Router();
const passport = require("passport");

//post Controller
const PostController = require("../controller/posts");

//@route GET api/posts/test
//@access Public
router.get("/test", PostController.post_testing);

//@route GET api/posts/
//@access Public
router.get("/", PostController.post_get_all_post);

//@route GET api/posts/:id
//@access Public
router.get("/:id", PostController.post_get_post);

//@route POST api/posts/
//@access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  PostController.post_create_post
);

//@route DELETE api/posts/:id
//@access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  PostController.post_delete_post
);

//@route POST api/posts/like:id
//@access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  PostController.post_like_post
);

//@route POST api/posts/unlike:id
//@access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  PostController.post_unlike_post
);

//@route POST api/posts/comment:id
//@access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  PostController.post_comment_post
);

//@route DELETE api/posts/comment/:id/:comment_id
//@access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  PostController.post_delete_post
);

module.exports = router;

//ROUTES FOR ACTIONS
//@route GET api/posts/test
//@route GET api/posts/  //auth:false
//@route GET api/posts/:id //auth:false

//@route DELETE api/posts/:id auth:true
//@route DELETE api/posts/comment/:id/:comment_id auth:true

//@route POST api/posts/ auth:true
//@route POST api/posts/like:id auth:true
//@route POST api/posts/unlike:id auth: true
//@route POST api/posts/comment:id auth: true
