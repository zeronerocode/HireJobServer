const router = require("express").Router();
// require("dotenv").config();
const recruiter = require("./routes/recruiter");

const users = require("./routes/users");
const profile = require("./routes/profile");

router.use("/users", users);
router.use("/profile", profile);

router.use("/recruiter", recruiter);


module.exports = router;
