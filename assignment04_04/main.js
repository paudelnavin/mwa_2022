require("./data/dbconnection.js").open();
const express = require("express");
const app = express();
require("dotenv").config();
const routes = require("./routes");

console.log("App started");

app.use("/api", routes)

const server = app.listen(process.env.PORT, function(){
    const port = server.address().port;
    console.log(process.env.START_MSG, port);
});

console.log("App closed");