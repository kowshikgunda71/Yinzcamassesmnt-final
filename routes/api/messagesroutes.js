const express = require("express");
const router = express.Router();
var { PostMessage } = require("../../models/message");
//api route for getting all the documents for keeping it in list to front end 
router.get("/gettingalldocs", (req, res) => {
  PostMessage.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while retrieving all records : " +
          JSON.stringify(err, undefined, 2)
      );
  });
});
//this is for searching 
router.get("/search", (req, res) => {
  const tag = req.query.tag;
  var condition = tag
    ? { tag: { $regex: new RegExp(tag), $options: "i" } }
    : {};

  PostMessage.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
});
//posting message api end point and creating record
router.post("/postmessage", (req, res) => {
  var newRecord = new PostMessage({
    message: req.body.message,
    tag: req.body.tag,
  });

  newRecord.save((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        "Error while creating new record : " + JSON.stringify(err, undefined, 2)
      );
  });
});
module.exports = router;
