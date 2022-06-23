const express = require("express");
const routes = require("./routes");
const path = require("path")
require("dotenv").config();
const app = express();
const functionLog = require("./controller/functions");

console.log("App started");

app.use(functionLog.functionLog);

app.use(express.static(path.join(__dirname, process.env.EXPRESS_PUBLIC_FOLDER)));
app.use("/api", routes);

app.listen(process.env.PORT);

console.log("App closed");