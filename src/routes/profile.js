const express = require("express");
const router = express.Router();
const { insertProfile} = require("../controller/profile.js");
const upload = require("../middleware/multer");



router
  .patch("/insertprofile/:id",upload.single("photo"), insertProfile);
//   .post("/login", login);

module.exports = router;