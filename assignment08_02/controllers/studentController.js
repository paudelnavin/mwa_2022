const mongoose = require("mongoose");
const Student = mongoose.model(process.env.STUDENT_MODEL);

const addoneStudent = function(req, res){
    const newStudent = {
        name: req.body.name,
        studentId: req.body.studentId,
        gpa: req.body.gpa
    }
    Student.create(newStudent, function(err,student){
        const response = {
            status: process.env.STATUS_OK,
            message: student
        }
        if(err){
            response.status=process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }else{
            response.status = process.env.STATUS_OK
            response.message = student;
        }
        res.status(response.status).json(response.message);
    });
}

const getOneStudent = function(req, res){
    const studentId = req.params.studentId;
    Student.findById(studentId).exec(function (err, student) {
        const response = {
            status: process.env.STATUS_OK,
            message: student
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = { "message": "Student Id is not valid" };
        } else if (!student) {
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Student Id not found" };
        } else {
            response.status = process.env.STATUS_OK;
            response.message = student;
        }
        res.status(response.status).json(response.message);
    });
}

const getAllStudents = function(req, res){
    Student.find().exec(function (err, student) {
        const response = {
            status: process.env.STATUS_OK,
            message: student
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = json(err);
        } else {
            response.status = process.env.STATUS_OK;
            response.message = student;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    addoneStudent,
    getAllStudents,
    getOneStudent
}