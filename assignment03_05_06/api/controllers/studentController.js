const studentData = require("../../data/student.json");

module.exports.getAll = function(req, res){
    console.log("GET all school ");
    res.status(200).json(studentData);
}

module.exports.getOne = function(req, res){
    const studentId = req.params.id;
    const theStudent = studentData[studentId];
    console.log("GET school with studentId ", studentId);
    res.status(200).json(theStudent);
}