const express = require("express");
const router = express.Router();
const hikingController = require("../../controller/hiking_controllers");
const plantController = require("../../controller/plant_controller")
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
    .put(jsonParser, hikingController.fullUpdateHiking)
    .patch(jsonParser, hikingController.partialUpdateHiking)
    .delete(hikingController.deleteOneHiking);

//Sub documents
router.route("/hikings/:hikingId/routeplants")
    .get(plantController.getAllHikingsRoutePlants)
    .post(jsonParser, plantController.addHikingRoutePlant)
    .delete(plantController.deleteAllHikingRoutePlant);


router.route("/hikings/:hikingId/routeplants/:plantId")
    .get(plantController.getOneHikingRoutePlant)
    .put(jsonParser, plantController.fullUpdateHikingRoutePlant)
    .patch(jsonParser, plantController.partialUpdateHikingRoutePlant)
    .delete(plantController.deleteOneHikingRoutePlant);

module.exports = router;