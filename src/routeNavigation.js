const router = require("express").Router();

const recruiter = require("./routes/recruiter");

router.use("/recruiter", recruiter);

module.exports = router;
