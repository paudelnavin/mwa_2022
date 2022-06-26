const mongoose = require("mongoose");
require("./hiking_model");

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on("connected", function(){
    console.log("Mongoose connected to "+ process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function(){
    console.log("Mongoose disconnected");
});

mongoose.connection.on("error", function(){
    console.log("Mongoose connection error "+ err);
});

process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MSG);
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGTERM_MSG);
        process.exit(0);
    });
});

process.once("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MSG);
        process.kill(process.pid, "SIGUSR2");
    });
});
