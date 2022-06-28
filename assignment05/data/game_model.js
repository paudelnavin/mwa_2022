const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
    publisher: {
        name: {
            type: String,
            required: true
        },
        location: { 
            coordinates: [Number]
        },
        country: String,
        established: Number
      }
});

const reviewSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        rating: Number,
        review: String,
        postDate: Date
});

const gameSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    rate: Number,
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 11
    },
    maxPlayers: {
        type: Number,
        min: 1,
        max: 11
    },
    publisher: [publisherSchema],
    reviews: [reviewSchema],
    minAge: {
        type: Number,
        min: 6,
        max: 99
    },
    designers: [String]
});

mongoose.model("Game", gameSchema, "games");