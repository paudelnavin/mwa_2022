const mongoose = require("mongoose");
const Game = mongoose.model(process.env.GAME_MODEL);

const addOneGame = function (req, res) {
    console.log(req.body);
    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate: req.body.rate,
        price: req.body.price,
        minPlayers: req.body.maxPlayers,
        maxPlayers: req.body.maxPlayers,
        minAge: req.body.minAge
    }
    // publisher: {name:"NoName"},
    // reviews:[],
    Game.create(newGame, function (err, game) {
        const response = {
            status: process.env.STATUS_OK,
            message: game
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else if (!game) {
            response.status = process.evv.STATUS_NOT_FOUND;
            response.message = { "message": "Game Id not found" };
        } else {
            response.status = process.env.STATUS_OK;
            response.message = game;
        }
        res.status(response.status).json(response.message);
    });
}

const getAllGame = function (req, res) {
    let offset = process.env.OFFSET_DEFAULT;
    let count = process.env.COUNT_DEFAULT;
    let maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.BASE_NUMBER);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.BASE_NUMBER)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.BASE_NUMBER);
    }
    if (count > maxCount) {
        res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Max count is 7" });
        return;
    }
    Game.find().skip(offset).limit(count).exec(function (err, game) {
        const response = {
            status: process.env.STATUS_OK,
            message: game
        }
        if (count > game.length) {
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "count cannot be greater than game size" })
            return;
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = json(err);
        } else {
            response.status = process.env.STATUS_OK;
            response.message = game;
        }
        res.status(response.status).json(response.message);
    });
}

const getOneGame = function (req, res) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        const response = {
            status: process.env.STATUS_OK,
            message: game
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = { "message": "Game Id is not valid" };
        } else if (!game) {
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Game Id not found" };
        } else {
            response.status = process.env.STATUS_OK;
            response.message = game;
        }
        res.status(response.status).json(response.message);
    }
    )
};

const _updateOne = function (req, res, updateGameCallback) {
    const gameId = req.params.gameId;
    Game.findById(gameId).exec(function (err, game) {
        const response = {
            status: process.env.STATUS_UPDATED,
            message: game
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = { "message": "Game Id is not valid" };
        } else if (!game) {
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Game Id not found" };
        }
        if (response.status != process.env.STATUS_UPDATED) {
            res.status(response.status).json(response.message)
        } else {
            updateGameCallback(req, res, game, response)
        }
    })
}

const fullUpdateOneGame = function (req, res) {
    gameUpdate = function (req, res, game, response) {
        game.title = req.body.title;
        game.year = req.body.year;
        game.rate = req.body.rate;
        game.price = req.body.price;
        game.minPlayers = req.body.maxPlayers;
        game.maxPlayers = req.body.maxPlayers;
        game.minAge = req.body.minAge;

        game.save(function (err, updatedGame) {
            if (err) {
                response.status = process.env.STATUS_INTERNAL_ERROR
                response.message = err;
            } else {
                response.status = process.env.STATUS_UPDATED
                response.message = updatedGame
            }
            console.log(updatedGame);
            res.status(response.status).json(response.message)
        })
    }
    _updateOne(req, res, gameUpdate)
}

const partialUpdateOneGame = function (req, res) {
    gameUpdate = function (req, res, game, response) {
        if (req.body.tilte) {
            game.title = req.body.title;
        }
        if (req.body.tilte) {
            game.year = req.body.year;
        }
        if (req.body.tilte) {
            game.rate = req.body.rate;
        }
        if (req.body.tilte) {
            game.price = req.body.price;
        }
        if (req.body.tilte) {
            game.minPlayers = req.body.maxPlayers;
        }
        if (req.body.tilte) {
            game.maxPlayers = req.body.maxPlayers;
        }
        if (req.body.tilte) {
            game.minAge = req.body.minAge;
        }

        game.save(function (err, updatedGame) {
            if (err) {
                response.status = process.env.STATUS_INTERNAL_ERROR
                response.message = err;
            } else {
                response.status = process.env.STATUS_UPDATED
                response.message = updatedGame
            }
            console.log(updatedGame);
            res.status(response.status).json(response.message)
        })
    }
    _updateOne(req, res, gameUpdate)
}

const deleteGame = function (req, res) {
    const gameId = req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, game) {
        if (err) {
            res.status(process.env.STATUS_INTERNAL_ERROR).json({ "message": "Game id is not valid" });
        } else if (!game) {
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Game id not found" });
        } else {
            res.status(process.env.STATUS_OK).json({ "message": "successfully delted this game " + game });
        }
    });
};

module.exports = {
    addOneGame,
    getAllGame,
    getOneGame,
    fullUpdateOneGame,
    partialUpdateOneGame,
    deleteGame
}