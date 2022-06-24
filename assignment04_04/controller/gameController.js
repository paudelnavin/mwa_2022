const dbConnection = require("../data/dbconnection");
const db = dbConnection.get();

console.log("db", db);
const gamesCollections = db.collection("games");
module.exports.getGames = function(req, res){
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
        const pageGames = gamesData.slice(offset, offset+count);
        res.status(process.env.STATUS_OK).json(pageGames);    
    }else{
        console.log("Count cannot be greater than 7");
        res.staus(400).json({error: "Count should be <= 7"});
    }
}

module.exports.createOne = function(req, res){
    let newGame = {};
    if(req.body && req.body.title && req.body.price && req.body.minPlayers > 1 && req.body.minPlayers < 11
         && req.body.minAge > 6 && req.body.minAge < 99 ){
        newGame.title = req.body.title;
        newGame.price = req,body.price;
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
    }
};

module.exports.getOne = function(req, res){
    const gameId = req.params.id;
    const theGame = gamesCollections[gameId];
    console.log("GET user wit userId ", gameId);
    res.status(process.env.STATUS_OK).json(theGame);
};

module.exports.deleteOne = function(req, res){
    
    gamesCollections.deleteOne(newGame, function(err, response){
    if(err){
        res.status(process.env.NOT_FOUND).json({error: "given id is not found"});
    }else{
        console.log(response);
        res.status(process.env.STATUS_OK).json({response});
    }
    })
};