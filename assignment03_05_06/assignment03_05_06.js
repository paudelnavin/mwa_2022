const express = require("express");
const routes = require("./api/routes/route");
const app = express();
require("dotenv").config();
const port = require("./api/controllers/ports");
const logFunction = require("./api/controllers/function_log")

console.log("App Started");

app.use(logFunction.functionLog);
app.use("/api", routes);

const server = app.listen(process.env.PORT,function(){
    const port = server.address().port;
    console.log(process.env.START_MSG, port);
});


console.log("App ended");