const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    studentId: Number,
    gpa: Number
});

mongoose.model("Student", studentSchema, "students");