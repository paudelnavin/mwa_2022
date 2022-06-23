const ports = function(req){
    console.log("inside log");
    const port = req.address().port;
    console.log(process.env.STRAT_MSG, port);
}

module.exports = {ports}