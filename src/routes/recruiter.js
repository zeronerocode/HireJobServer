const router = require("express").Router();
const {
  register,
  login,
  deleteRec,
  refreshToken,
} = require("../controller/authRecruiter");
const {
  profile,
  updateProfile,
  list,
  getRecById,
  recActivate,
} = require("../controller/recruiterControllers");
// const uploads = require("../middleware/multer");
const { protect } = require("../middleware/auth_recruiter");

router
  // auth
  .post("/register", register)
  .post("/login", login)
  .delete("/:id", protect, deleteRec)
  .post("/refresh-token", refreshToken)

  // profile
  .get("/profile", protect, profile)
  .patch("/:id", updateProfile)

  //recruiter home
  .get("/", list)
  .get("/:id", getRecById)
  .get("/verify/:token", recActivate);
// .get("/:id", jwtAuth, detail)
// .put("/:id", update)
// .put("/:id/photo", upload, updatePhoto)

module.exports = router;
