const router = require("express").Router();
const { register, login } = require("../controller/recruiterController");

router.post("/register", register).post("/login", login);

module.exports = router;
