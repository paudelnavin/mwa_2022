const mongoose = require("mongoose");
const User = mongoose.model(process.env.USER_MODEL);
const bcrypt = require("bcrypt");
const CommonFunctions = require("../../shared/shared.functions");
const jwt = require("jsonwebtoken")

//create the user, the return is also a promise
const _createUser = function (req, hashedPassword) {
    const newUser = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        username: req.body.username,
        password: hashedPassword
    }
    return User.create(newUser);
}

//api to add a single record
const addUser = function (req, res) {
    let response = CommonFunctions._responseDeclaration();
    response = CommonFunctions._userJsonValidation(req, res, response)
    if (response.status != process.env.STATUS_INTERNAL_ERROR) {
        bcrypt.genSalt(process.env.SALT_ROUND)
            .then((salt) => CommonFunctions._generateHash(salt, req.body.password))
            .then((hashedPassword) => _createUser(req, hashedPassword))
            .then((user) => CommonFunctions._fillResponse(response, process.env.STATUS_SUCCESSFULLY_CREATED, user))
            .catch((error) => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, error))
            .finally(() => CommonFunctions._sendResponse(response, res))
    } else {
        CommonFunctions._sendResponse(response, res)
    }
}

const _checkifuserfound = function (user, username, response) {
    return new Promise((resolve, reject) => {
        if (username == user.username) {
            response.status = process.env.STATUS_OK
            response.message = {}
            resolve(user);
        } else {
            reject("Unauthorized");
        }
    })
}

const _checkAccountPassword = function (user, password, response) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password)
            .then((passwordMatch) => {
                if (passwordMatch) {
                    response.status = process.env.STATUS_OK
                    response.message = {}
                    resolve(user);
                }
                else {
                    reject("Unauthorized");
                }
            })
    });
}

const _generateToken=function(user, response){
	const token=jwt.sign({name: user.firstname+ " "+user.lastname}, "CS572", {expiresIn:3600});
	response.status=200;
	response.message={token:token};
} 

const userLogin = function (req, res) {
    const response = CommonFunctions._responseDeclaration();
    if (req.body && req.body.username && req.body.password) {
        User.findOne({ username: req.body.username })
            .then(user => _checkifuserfound(user, req.body.username, response))
            .then((user) => _checkAccountPassword(user, req.body.password, response))
            .then(user=>_generateToken(user, response))
            .then((token) => CommonFunctions._fillResponse(response, process.env.STATUS_OK, response.message))
            .catch((err) => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, err))
            .finally(() => CommonFunctions._sendResponse(response, res))
    } else {
        response.status = process.env.STATUS_BAD_REQUEST,
            response.message = "username and password missing"
        res.status(response.status).json(response.message);
    }
}

module.exports = {
    addUser,
    userLogin
}
