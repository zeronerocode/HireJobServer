const express = require("express");
const router = express.Router();
const { insertProfile, insertExperience, insertPortofolio, insertSkill, getExperience, getSkill, getPortofolio, getUsers, deletePortofolio, deleteExperience, deleteSkill, getSkillById, getExpeById, getPortofolioById} = require("../controller/profile.js");
const upload = require("../middleware/multer");
const {protect} = require("../middleware/auth");

router
  .put("/", protect, upload.single("photo"), insertProfile)
  .post("/experience",protect, insertExperience)
  .post("/portofolio",protect, upload.single("appImage"), insertPortofolio)
  .post("/skill",protect,insertSkill)
  .get("/experience",protect,getExperience)
  .get("/experience/:id",getExpeById)
  .get("/skill",protect,getSkill)
  .get("/skill/:id",getSkillById)
  .get("/portofolio",protect,getPortofolio)
  .get("/portofolio/:id",getPortofolioById)
  .get("/getuser",getUsers)
  .delete("/portofolio/:id", protect, deletePortofolio)
  .delete("/experience/:id", protect, deleteExperience)
  .delete("/skill/:id",protect,deleteSkill);


module.exports = router;