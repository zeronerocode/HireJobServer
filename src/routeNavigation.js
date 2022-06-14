const router = require("express").Router();

const users = require("./routes/users");
const profile = require("./routes/profile");

router.use("/users", users);
router.use("/profile", profile);

module.exports = router;
