const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create schema
const UserShcema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, //unique for search optimization
    match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  },
  password: {
    type: String,
    required: true
  },
  profileavatar: [
    {
      photo: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Users = mongoose.model("users", UserShcema);
