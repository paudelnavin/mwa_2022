const express = require("express");
const router = express.Router();
const hikingController = require("../../controller/hiking_controllers");
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

//Main documents
router.route("/hikings")
    .get(hikingController.getAllHikings)
    .post(jsonParser, hikingController.addHiking)
    .delete(hikingController.deleteAllHikings);

router.route("/hikings/:hikingId")
    .get(hikingController.getOneHiking)
    .put(jsonParser, hikingController.updateHiking)
    .delete(hikingController.deleteOneHiking);

//Sub documents
router.route("/hikings/:hikingId/plants")
    .get(hikingController.getAllHikingsRoutePlants)
    .post(jsonParser, hikingController.addHikingRoutePlant)
    .delete(hikingController.deleteAllHikingRoutePlant);


router.route("/hikings/:hikingId/plants/:plantId")
    .get(hikingController.getOneHikingRoutePlant)
    .put(jsonParser, hikingController.UpdateHikingRoutePlant)
    .delete(hikingController.deleteOneHikingRoutePlant);

module.exports = router;