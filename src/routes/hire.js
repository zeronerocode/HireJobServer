const express = require("express");
const router = express.Router();
const { addHiring, getHire } = require("../controller/hireController");
const {protect} = require("../middleware/auth");

router
    .get("/", protect, getHire)
    .post("/", addHiring);

module.exports = router;