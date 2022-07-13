const express = require("express");
const router = express.Router();
const app = express();
const routes = require("../../users/routes/users.routes");
const hikingController = require("../controller/hikings.controllers");
const plantController = require("../controller/plants.controllers");
const bodyParser = require("body-parser")

const jsonParser = bodyParser.json()

//Main documents
router.route("/")
    .get(hikingController.getAllHikings)
    .post(jsonParser, hikingController.addHiking)
    .delete(hikingController.deleteAllHikings);

router.route("/:hikingId")
    .get(hikingController.getOneHiking)
    .put(jsonParser, hikingController.fullUpdateHiking)
    .patch(jsonParser, hikingController.partialUpdateHiking)
    .delete(hikingController.deleteOneHiking);

//Sub documents
router.route("/:hikingId/routeplants")
    .get(plantController.getAllHikingsRoutePlants)
    .post(jsonParser, plantController.addHikingRoutePlant);

router.route("/:hikingId/routeplants/:plantId")
    .get(plantController.getOneHikingRoutePlant)
    .put(jsonParser, plantController.fullUpdateHikingRoutePlant)
    .patch(jsonParser, plantController.partialUpdateHikingRoutePlant)
    .delete(plantController.deleteOneHikingRoutePlant);

module.exports = router;