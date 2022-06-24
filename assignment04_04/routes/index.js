const express = require("express");
const router = express.Router();
const gameContoller = require("../controller/gameController")

router.route("/games").get(gameContoller.getGames);
router.route("/games").post(gameContoller.createOne);
router.route("/games/:id").get(gameContoller.getOne);
router.route("/games/:id").delete(gameContoller.deleteOne);

module.exports = router;