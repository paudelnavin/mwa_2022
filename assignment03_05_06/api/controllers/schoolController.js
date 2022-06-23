const schoolData = require("../../data/school.json");

module.exports.getAll = function(req, res){
    console.log("GET all school ");
    res.status(200).json(schoolData);
}

module.exports.getOne = function(req, res){
    const schoolId = req.params.schoolId;
    const theSchool = schoolData[schoolId];
    console.log("GET school with schooldId ", schoolId);
    res.status(200).json(theSchool);
}