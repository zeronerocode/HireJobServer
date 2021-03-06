const express = require("express");
const router = express.Router();
const { register, login, getProfile} = require("../controller/users.js");
const { protect } = require('../middleware/auth')

router
  .post("/register", register)
  .post("/login", login)
  .get('/profile', protect, getProfile)
//   .post("/refresh-token", refreshToken)
//   .delete("/:id", delUser);

module.exports = router;