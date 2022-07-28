const express = require("express");
const router = express.Router();
const { register, login, getProfile, getProfileById, activation} = require("../controller/users.js");
const { protect } = require("../middleware/auth");

router
  .post("/register", register)
  .post("/login", login)
  .get("/profile", protect, getProfile)
  .get("/activate/:token/:id", activation);
  .get("/profile/:id", getProfileById);
//   .post("/refresh-token", refreshToken)
//   .delete("/:id", delUser);

module.exports = router;