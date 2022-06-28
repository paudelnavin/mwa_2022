const express = require("express");
const router = express.Router();
const gameContoller = require("../controller/gameController")
const publisherContoller = require("../controller/publisher_controller")
const reviewController = require("../controller/review_controller")
var bodyParser = require('body-parser');

// create application/json parser
var jsonParser = bodyParser.json()

//Games
router.route("/games")
    .post(jsonParser, gameContoller.addOneGame)
    .get(gameContoller.getAllGame);

router.route("/games/:gameId")
    .get(gameContoller.getOneGame)
    .put(jsonParser, gameContoller.fullUpdateOneGame)
    .patch(jsonParser, gameContoller.partialUpdateOneGame)
    .delete(gameContoller.deleteGame);

//Publishers
router.route("/games/:gameId/publishers")
    .post(jsonParser, publisherContoller.addOnePublisher)
    .get(publisherContoller.getAllPublishers);

router.route("/games/:gameId/publishers/:publisherId")
    .put(jsonParser, publisherContoller.fullyUpdateOnePublisher)
    .patch(jsonParser, publisherContoller.partialUpdateOnePublisher)
    .delete(publisherContoller.deleteOnePublisher)

//Review
router.route("/games/:gameId/publishers")
    .post(jsonParser, reviewController.addOneReview)
    .get(reviewController.getAllReviews);

router.route("/games/:gameId/publishers/:publisherId")
    .put(jsonParser, reviewController.fullyUpdateOneReview)
    .patch(jsonParser, reviewController.partialUpdateOneReview)
    .delete(reviewController.deleteOneReview)

module.exports = router;