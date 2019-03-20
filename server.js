const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//init express
const app = express();

// bring in resources
const users = require("./api/routes/users"); // /register && /login
const profile = require("./api/routes/profile");
const posts = require("./api/routes/posts");
const uploadsphoto = require("./api/routes/uploadphoto");

//MIDDLEWARES
//parse upload to be avaiable
app.use("/uploads", express.static("uploads"));

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());

//passport config
require("./api/config/passport")(passport);

// DB config
const db = require("./api/config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDb Connected")) //promise return
  .catch(err => console.log(err));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);
app.use("/api/photo", uploadsphoto);

const port = process.env.port || 5000;
//server
app.listen(port, () => console.log(`Server running on port ${port}`));
