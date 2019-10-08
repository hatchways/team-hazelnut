const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");
const authenticate = require("./utils/auth");
const upload = require("../services/image-upload");

const singleUpload = upload.single("image");

router.post("/image-upload", authenticate, function(req, res) {
  singleUpload(req, res, async function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "File Upload Error", detail: err.message }]
      });
    }

    let user = await Profile.findById(req.user);
    if (user) {
      user.photoUrl = req.file.location;
      await user.save();
    }

    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
