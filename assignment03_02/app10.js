const express = require("express");
require("dotenv").config();
const path = require("path")
const server = require("./controller/ports");
const log = require("./controller/function_log");

console.log("App started");

const app = express();

app.use(log.functionLog);

// app.get("/", function(req, res){
//     console.log("GET received.");
//     res.status(200).send("Received your GET request");
// });

app.use("/public", express.static(path.join(__dirname, process.env.EXPRESS_PUBLIC_FOLDER)));

const ports = app.listen(process.env.PORT);

console.log("App ended");