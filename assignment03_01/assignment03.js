const express = require("express")
const app = express()
require("dotenv").config();
const path = require("path");
const page = require("./controllers/ports");
const logFunction = require("./controllers/function_log")

console.log("App Started");

app.use(logFunction.functionLog);

app.use(express.static(path.join(__dirname, process.env.EXPRESS_PUBLIC_FOLDER)));

app.listen(process.env.PORT, page.ports);


console.log("App ended");