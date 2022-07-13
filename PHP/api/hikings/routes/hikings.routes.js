const express = require("express");
const router = express.Router();
const app = express();
const routes = require("../../users/routes/users.routes");
const hikingController = require("../controller/hikings.controllers");
const plantController = require("../controller/plants.controllers");
const bodyParser = require("body-parser")

//Main documents
router.route("/")
    .get(hikingController.getAllHikings)
    .post(hikingController.addHiking)
    .delete(hikingController.deleteAllHikings);

router.route("/:hikingId")
    .get(hikingController.getOneHiking)
    .put(hikingController.fullUpdateHiking)
    .patch(hikingController.partialUpdateHiking)
    .delete(hikingController.deleteOneHiking);

//Sub documents
router.route("/:hikingId/routeplants")
    .get(plantController.getAllHikingsRoutePlants)
    .post(plantController.addHikingRoutePlant);

router.route("/:hikingId/routeplants/:plantId")
    .get(plantController.getOneHikingRoutePlant)
    .put(plantController.fullUpdateHikingRoutePlant)
    .patch(plantController.partialUpdateHikingRoutePlant)
    .delete(plantController.deleteOneHikingRoutePlant);

module.exports = router;