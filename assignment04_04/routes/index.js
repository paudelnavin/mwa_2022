const express = require("express");
const router = express.Router();
const gameContoller = require("../controller/gameController")
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()
 
router.route("/games").get(gameContoller.getGames);
router.route("/games").post(jsonParser, gameContoller.createOne);
router.route("/games/:id").get(gameContoller.getOne);
router.route("/games/:id").delete(gameContoller.deleteOne);

module.exports = router;