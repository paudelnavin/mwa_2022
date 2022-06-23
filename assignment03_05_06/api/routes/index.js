const express = require("express");
const router = express.Router();
const schoolController = require("../controllers/schoolController")

router.route("/school").get(schoolController.getAll);
router.route("/school/:id").get(schoolController.getOne);

module.exports = {router};
