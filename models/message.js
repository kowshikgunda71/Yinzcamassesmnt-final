const mongoose = require("mongoose");
//message model 
var PostMessage = mongoose.model(
  "PostMessage",
  {
    message: { type: String },
    tag: { type: String },
  },
  "postMessages"
);

module.exports = { PostMessage };
