const router = require("express").Router();
require("dotenv").config();
const recruiter = require("./routes/recruiter");
const users = require("./routes/users");
const profile = require("./routes/profile");
const hire = require("./routes/hire");

router.use("/users", users);
router.use("/profile", profile);
router.use("/recruiter", recruiter);
router.use("/hire", hire);


module.exports = router;
