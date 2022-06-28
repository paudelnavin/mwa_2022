const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const _addReview = function(req, res, game){
    game.rviews.name = req.body.name;
    game.reviews.review = req.body.country;
    game.reviews.postDate = req.body.postDate;

    game.save(function (err, updatedGame) {
        const response = { status: process.env.SATUS_OK, message: [] };
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        } else {
            response.status = process.env.STATUS_SUCCESSFULLY_CREATED
            response.message = updatedGame.publisher
        }
        res.status(response.status).json(response.message)
    })
}

const addOneReview = function(req, res){
    console.log("Add One Review Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = { status: process.env.SATUS_OK, message: game }
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else if (!game) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Game ID not found " + gameId };
        }
        if (game) {
            _addReview(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}
const getAllReviews = function(req, res){
    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function (err, game) {
        const response = { status: process.env.STATUS_OK, message: game };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!game) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + gameId };
        }
        if (game) {
            res.status(response.status).json(game.review);
        } else {
            res.status(response.status).json(response.message);
        }
    });

}
const fullyUpdateOneReview = function(req, res){
    _updateOne(req, res, _fullReviewUpdate)
}
const partialUpdateOneReview = function(req, res){
    _updateOne(req, res, _partialReviewUpdate)
}
const _fullReviewUpdate = function (req, res, game) {
    game.reviews.name = req.body.name;
    game.reviews.review = req.body.review;
    game.reviews.date = req.body.date;

    game.save(function (err, updatedGame) {
        const response = {
            status: process.env.STATUS_SUCCESSFULLY_UPDATED,
            message: updatedGame.publisher
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        }
        res.status(response.status).json(response.message)
    })
}

const _partialReviewUpdate = function (req, res, game) {
    if (req.body.name) {
        game.publisher.name = req.body.name;
    }
    if (req.body.review) {
        game.publisher.review = req.body.review
    }
    if (req.body.date) {
        game.publisher.date = req.body.date
    }

    game.save(function (err, updatedGame) {
        const response = {
            status: process.env.STATUS_SUCCESSFULLY_CREATED, message: updatedGame.publisher
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        }

        res.status(response.status).json(response.message)
    })
}

const deleteOneReview = function(req, res){
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Hiking.findById(reviewId).select("reviews").exec(function (err, game) {
        const response = { status: process.env.STATUS_OK, message: game };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!game) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + gameId };
        }
        if (game) {
            _deleteReview(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}

const _deleteReview = function (req, res, game) {
    game.review = { name: "NoName" };
    game.save(function (err, updatedGame) {
        const response = {
            status: process.env.STATUS_SUCCESSFULLY_UPDATED,
            message: []
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        } else {
            response.status = process.env.STATUS_SUCCESSFULLY_CREATED
            response.message = updatedGame.publisher
        }
        res.status(response.status).json(response.message)
    })
}

module.exports = {
    addOneReview,
    getAllReviews,
    fullyUpdateOneReview,
    partialUpdateOneReview,
    deleteOneReview
}