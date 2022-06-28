const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const _addPublisher = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country
    game.publisher.established = req.body.established
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]

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

const addOnePublisher = function (req, res) {
    console.log("Add One Publisher Controller");
    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function (err, game) {
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
            _addPublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _updateOne = function (req, res, publisherUpdateCallback) {
    console.log("Update One Publisher Controller");
    const gameId = req.params.gameId
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204, message: game }
        if (err) {
            console.log("Error Finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        } else if (!game) {
            console.log("Game with given ID not found");
            response.status = process.env.STATUS_NOT_FOUND
            response.message = { message: "Game ID not found" }
        }
        if (response.status !== process.env.STATUS_SUCCESSFULLY_UPDATED) {
            res.status(response.status).json(response.message)
        }
        publisherUpdateCallback(req, res, game)
    })
}

const _fullPublisherUpdate = function (req, res, game) {
    game.publisher.name = req.body.name;
    game.publisher.country = req.body.country
    game.publisher.established = req.body.established
    game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]

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

const _partialPublisherUpdate = function (req, res, game) {
    if (req.body.name) {
        game.publisher.name = req.body.name;
    }
    if (req.body.country) {
        game.publisher.country = req.body.country
    }
    if (req.body.established) {
        game.publisher.established = req.body.established
    }
    if (req.body.lng && req.body.lat) {
        game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }
    game.save(function (err, updatedGame) {
        const response = {
            status: 204, message: updatedGame.publisher
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        }

        res.status(response.status).json(response.message)
    })
}

const getAllPublishers = function (req, res, publisherUpdateCallback) {
    console.log("Update One Publisher Controller");
    const gameId = req.params.gameId
    Game.findById(gameId).select("publisher").exec(function (err, game) {
        const response = { status: 204, message: game }
        if (err) {
            console.log("Error Finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        } else if (!game) {
            console.log("Game with given ID not found");
            response.status = process.env.STATUS_NOT_FOUND
            response.message = { message: "Game ID not found" }
        }
        if (response.status !== 204) {
            res.status(response.status).json(response.message)
        }
        publisherUpdateCallback(req, res, game)
    })
}

const fullyUpdateOnePublisher = function (req, res) {
    _updateOne(req, res, _fullPublisherUpdate)
}

const partialUpdateOnePublisher = function (req, res) {
    _updateOne(req, res, _partialPublisherUpdate)
}

const deleteOnePublisher = function (req, res) {
    const gameId = req.params.gameId;
    const publisherId = req.params.publisherId;
    Hiking.findById(gameId).select("publisher").exec(function (err, game) {
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
            _deletePublisher(req, res, game);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}

const _deletePublisher = function (req, res, game) {
    game.publisher = { name: "NoName" };
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
    addOnePublisher,
    getAllPublishers,
    fullyUpdateOnePublisher,
    partialUpdateOnePublisher,
    deleteOnePublisher
}