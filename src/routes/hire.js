const express = require("express");
const router = express.Router();
const { addHiring } = require("../controller/hireController");

router
    .post("/", addHiring);

module.exports = router;