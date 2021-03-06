// Posts model
const Post = require("../models/Post");
//Profile model
const Profile = require("../models/Profile");

//Validator
const validatePostInput = require("../validation/post");

//@route GET api/posts/test
//@des Test post Rout
//@access Public
exports.post_testing = (req, res) => res.json({ msg: "Posts Works" });

//@route GET api/posts/
//@des Test post Route
//@access Public
exports.post_get_all_post = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({
        noPostFound: "There is no post available yet, come back later"
      })
    );
};

//@route GET api/posts/:id
//@des Test post Route by id
//@access Public
exports.post_get_post = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({ noPostFound: "No Post found" }));
};

//@route POST api/posts/
//@des send post Route
//@access Private
exports.post_create_post = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  //Check Validation
  if (!isValid) {
    //IF any errors, send 400 with errors
    return res.status(400).json(errors);
  }
  //create new post from the post model
  const newPost = new Post({
    text: req.body.text,
    name: req.user.name,
    avatar: req.user.avatar,
    user: req.user.id
  });
  newPost.save().then(post => res.json(post));
};

//@route DELETE api/posts/:id
//@des Delete post
//@access Private
exports.post_delete_post = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        //check for post owner
        if (post.user.toString() !== req.user.id) {
          return res.status(401).json({ notAuthorized: "User not authorized" });
        }
        //delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ noPostFound: "No Post found" }));
  });
};

//@route POST api/posts/like:id
//@des Like post
//@access Private
exports.post_like_post = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyLiked: "User already liked this post" });
        }
        //add user id to likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ noPostFound: "No Post found" }));
  });
};

//@route POST api/posts/unlike:id
//@des Unlike post
//@access Privat
exports.post_unlike_post = (req, res) => {
  Profile.findOne({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notLiked: "You have not yet liked this post" });
        }
        //Get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        //splice out of array
        post.likes.splice(removeIndex, 1);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ noPostFound: "No Post found" }));
  });
};

//@route POST api/posts/comment:id
//@des comment post
//@access Private

exports.post_comment_post = (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  //Check Validation
  if (!isValid) {
    //IF any errors, send 400 with errors
    return res.status(400).json(errors);
  }
  Post.findById(req.params.id).then(post => {
    const newComment = new Post({
      text: req.body.text,
      name: req.user.name,
      avatar: req.user.avatar,
      user: req.user.id
    });

    //add comments to array
    post.comments.unshift(newComment);
    //save
    post
      .save()
      .then(post => res.json(post))
      .catch(err =>
        res
          .status(404)
          .json({ commentCantAdd: "Comment cant be added at this time" })
      );
  });
};

//@route DELETE api/posts/comment/:id/:comment_id
//@des DELETE post
//@access Private
exports.post_delete_post = (req, res) => {
  Post.findById(req.params.id).then(post => {
    //check for comments
    if (
      post.comments.filter(
        comment => comment._id.toString() === req.params.comment_id
      ).length === 0
    ) {
      return res.status(404).json({ commentNotExit: "Comment does not exist" });
    }

    //get remove index
    const removeIndex = post.comments
      .map(item => item._id.toString())
      .indexOf(req.params.comment_id);
    //splice out of array
    post.comments.splice(removeIndex, 1);
    //save
    post
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ noPostFound: "No Post Found" }));
  });
};
