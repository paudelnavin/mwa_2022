const ports = function(){
    console.log("ok");
    const port = server.address().port;
    console.log(process.env.STRAT_MSG, port);
}