const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// bring in resources
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDb Connected")) //promise return
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("hello"));

//use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.port || 5000;
//server
app.listen(port, () => console.log(`Server running on port ${port}`));
