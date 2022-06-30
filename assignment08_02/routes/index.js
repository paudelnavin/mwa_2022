const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController")
const bodyParser = require("body-parser");

var jsonParser = bodyParser.json()

router.route("/students")
    .post(jsonParser, studentController.addoneStudent)
    .get(studentController.getAllStudents);
router.route("/students/:studentId").get(studentController.getOneStudent);

module.exports = router;
