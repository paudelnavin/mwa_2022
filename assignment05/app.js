require("dotenv").config();
require("./data/db.js");
const express = require("express");
const app = express();
const routes = require("./routes");


console.log("App started");

app.use("/api", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, XRequested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});
app.use("/api", routes);

const server = app.listen(process.env.PORT, function(){
    const port = server.address().port;
    console.log(process.env.START_MSG, port);
});

console.log("App closed");