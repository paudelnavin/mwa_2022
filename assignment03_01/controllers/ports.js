const server = function(){
    console.log("inside log");
    const port = server.address().port;
    console.log(process.env.STRAT_MSG, port);
}

module.exports = {server};