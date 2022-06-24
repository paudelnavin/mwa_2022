const express = require("express");
const router = express.Router();
const gameContoller = require("../controller/gameController")

router.route("/students").get(gameContoller.getGames);
// router.route("/students/:id").get(gameContoller.getUsers);

module.exports = router;