
const dbConnection = require("../data/dbconnection");
const db = dbConnection.get();

console.log("db", db);
module.exports.getGames = function(req, res){
    console.log("GET 4 games or as many as user specifies but not exceeding 7");
    const gamesData = db.collection("games");
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