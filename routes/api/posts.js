const express = require("express");
const router = express.Router();

//@route GET api/posts/test
//@des Test post Rout
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));
module.exports = router;
