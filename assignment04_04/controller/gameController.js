const dbConnection = require("../data/dbconnection");
const ObjectId = require("mongodb").ObjectId;

module.exports.createOne = function(req, res){
    const db = dbConnection.get();
    const gamesCollections = db.collection("games");
    let newGame = {};
    console.log(req.body);
    if(req.body && req.body.title && req.body.price && req.body.minPlayers > 1 && req.body.minPlayers < 11
        && req.body.minAge > 6 && req.body.minAge < 99 ){
        newGame.title = req.body.title;
        newGame.price = req.body.price;
        newGame.minPlayers = req.body.minPlayers;
        newGame.minAge  = req.body.minAge;
        gamesCollections.insertOne(newGame, function(err, response){
            if(err){
                res.status(process.env.INTERNAL_ERROR).json({error: "title and price is required field"});
            }else{
                console.log(response);
                res.status(process.env.CREATED_SUCCESS_STATUS).json({response});
            }
        })
    }else{
        res.status(process.env.NOT_FOUND).json({error: "check body"});
    }
};

module.exports.getGames = function(req, res){
    const db = dbConnection.get();
    const gamesCollections = db.collection("games");
    console.log("GET 4 games or as many as user specifies but not exceeding 7");
    let offset =0;
    let count = 4;

    if(req.query&&req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query&&req.query.count){
        count = parseInt(req.query.count, 10);
    }
    if(count<=7){
        gamesCollections.find().skip(offset).limit(count).toArray(function(err, games){
            console.log("Found games", games);
            res.status(process.env.STATUS_OK).json(games); 
        })
    }else{
        console.log("Count cannot be greater than 7");
        res.status(process.env.NOT_FOUND).json({error: "Count should be <= 7"});
        return;
    }
}

module.exports.getOne = function(req, res){
    const db = dbConnection.get();
    const gamesCollection = db.collection("games");
    const gameId = req.params.id;
    gamesCollection.findOne({_id : ObjectId(gameId)}, function(err, game) {
        console.log("Found game", game);
        res.status(process.env.STATUS_OK).json(game);
    }
)};

module.exports.deleteOne = function(req, res){
    const db = dbConnection.get();
    const gamesCollections = db.collection("games");
    const gameId = req.params.id;
    gamesCollections.deleteOne({_id : ObjectId(gameId)}, function(err, response){
        if(err){
            res.status(process.env.NOT_FOUND).json({error: "given id is not found"});
        }else{
            console.log(response);
            res.status(process.env.STATUS_OK).json({response});
        }
    })
};