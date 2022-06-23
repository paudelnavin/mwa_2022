const express = require("express");
const routes = require("./api/routes/route");
const app = express();
require("dotenv").config();
const port = require("./api/controllers/ports");
const logFunction = require("./api/controllers/function_log")

console.log("App Started");

app.use(logFunction.functionLog);
app.use("/api", routes);

app.listen(process.env.PORT, port.port);


console.log("App ended");