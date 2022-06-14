const express = require("express");
const router = express.Router();
const { insertProfile, insertExperience, insertPortofolio, insertSkill, getExperience, getSkill, getPortofolio} = require("../controller/profile.js");
const upload = require("../middleware/multer");
const {protect} = require("../middleware/auth");



router
  .patch("/profile", protect, upload.single("photo"), insertProfile)
  .post("/experience",protect, insertExperience)
  .post("/portofolio",protect, upload.single("appImage"), insertPortofolio)
  .post("/skill",protect,insertSkill)
  .get("/experience",protect,getExperience)
  .get("/skill",protect,getSkill)
  .get("/portofolio",protect,getPortofolio);

module.exports = router;