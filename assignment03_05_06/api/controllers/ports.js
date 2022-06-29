const getPort = function(){
    console.log("ok");
    const port = server.address().port;
    console.log(process.env.STRAT_MSG, port);
}

module.exports = getPort;