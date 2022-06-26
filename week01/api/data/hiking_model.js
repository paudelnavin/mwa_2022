const mongoose = require("mongoose");

const routePlantSchema = mongoose.Schema({
    name: String,
    description: String
});

const hikingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    endpoint1: String,
    endpoint2: String,
    state: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true,
        min: process.env.MIN_LENGTH,
        max: process.env.MIN_LENGTH
    },
    length_unit: {
        type: String,
        required: true,
        "default": "miles"
    },
    routePlants: [routePlantSchema]
});


mongoose.model("Hiking", hikingSchema, "hikings");