require("dotenv").config();
require("./api/dbConnection/hiking.db");
const express = require("express");
const app = express();
const routes = require("./api/shared/index.router");

console.log("App started");

app.use("/api", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTION');
    next();
});

app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
    const port = server.address().port;
    console.log(process.env.START_MSG, port);
});

console.log("App closed");