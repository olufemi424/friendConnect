const express = require("express");
const router = express.Router();

//@route GET api/profile/test
//@des Test profile Rout
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));
module.exports = router;
