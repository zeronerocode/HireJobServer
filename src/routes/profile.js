const express = require("express");
const router = express.Router();
const { insertProfile, insertExperience} = require("../controller/profile.js");
const upload = require("../middleware/multer");



router
  .patch("/insertprofile/:id",upload.single("photo"), insertProfile)
  .post("/insertexperience/:id", insertExperience);

module.exports = router;