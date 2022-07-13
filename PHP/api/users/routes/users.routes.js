const express = require("express");
const router = express.Router();
const app = express();
const userController = require("../../users/contollers/users.controller")
const bodyParser = require("body-parser")

const jsonParser = bodyParser.json();

router.route("/register")
    .post(jsonParser, userController.addUser)
router.route("/login")
    .post(jsonParser, userController.userLogin)

module.exports = router;