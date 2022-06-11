const router = require("express").Router();
const recruiterController = require("../controller/recruiterController");

router
  .post("/register", recruiterController.register)
  .post("/login", recruiterController.login);

module.exports = router;
