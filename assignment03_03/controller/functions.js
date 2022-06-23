const gamesData = require("../data/games.json")

const functionLog = function(req, res, next){
    console.log(req.method, req.url);
    next();
}

const getAll = function(req, res){
    console.log("GET all games");
    let offset =0;
    let count = 5;

    if(req.query&&req.query.offset){
        offset = parseInt(req.query.offset, 10);
    }
    if(req.query&&req.query.count){
        count = parseInt(req.query.count, 10);
    }
    const pageGames = gamesData.slice(offset, offset+count);
    res.status(process.env.STATUS_OK).json(pageGames);
}

module.exports = {functionLog, getAll};
// or can do module.exports.getAll = 