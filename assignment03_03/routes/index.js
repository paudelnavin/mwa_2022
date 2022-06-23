const express = require("express");
const router = express.Router();
const functions = require("../controller/functions");

router.route("/games").get(functions.getAll);

module.exports = router;