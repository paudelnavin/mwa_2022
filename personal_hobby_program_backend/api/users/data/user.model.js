const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    username: {
        type: String,
        minlength: 5,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    }
});

mongoose.model("User", userSchema, "users");