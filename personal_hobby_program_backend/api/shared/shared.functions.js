const bcrypt = require("bcrypt");

//generate the encrypted hash, the return is a promise
const _generateHash = function (salt, password) {
    return bcrypt.hash(password, salt);
}

let _validateHiking = function (hiking) {
    if (hiking == null) {
        message = { "message": "Hiking Id not found" }
    } else {
        message = hiking
    }
    return message;
}

const _fillResponse = function (response, status, message) {
    response.status = status;
    response.message = message;
    return response;
}

const _sendResponse = function (response, res) {
    res.status(response.status).json(response.message);
}

const _checkError = function (hiking, response, error) {

    return new Promise((reject, resolve) => {
        if (error) {
            message = { "message": "Hiking Id is not valid" }
            _fillResponse(response, process.env.STATUS_INTERNAL_ERROR, message)
            reject(response)
        } else if (!hiking) {
            message = { "message": "Hiking Id not found" }
            _fillResponse(response, process.env.STATUS_NOT_FOUND, message)
            reject(response)
        } else {
            message = hiking
            _fillResponse(response, process.env.STATUS_OK, message)
            resolve(hiking)
        }
    })
}

const _jsonValidation = function (req, res) {
    if ((!req.body && !req.body.name && !req.body.distance.length && !req.body.state) ||
        (req.body.name != "" && req.body.distance.length != "" && req.body.state != "")) {
        return res.status(process.env.STATUS_INTERNAL_ERROR).json({ "message": "Name, state and length is required field" });
    }
}

const _userJsonValidation = function (req, res, response) {
    if ((req.body && req.body.username && req.body.password) &&
        (req.body.username.length >= 5 && req.body.password.length >= 6)) {
        response.status = process.env.STATUS_OK;
        response.message = {};
    } else {
        response = _fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { "message": "username with min length 5 & password with min length 6 is required field" });
        // _sendResponse(response, res);
    }
    return response;
}


const _responseDeclaration = function () {
    let response = {
        status: process.env.STATUS_OK,
        message: {}
    }
    return response;
}

const _pagination = function (req, res) {
    let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
    let count = parseInt(process.env.DEFAULT_FIND_COUNT);
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT, process.env.BASE_NUMBER);
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, process.env.BASE_NUMBER);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, process.env.BASE_NUMBER);
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(process.env.STATUS_NOT_FOUND).json({ "message": "QueryString Offset and Count should be in numbers" });
        return;
    }
    if (count > maxCount) {
        res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Cannot exceed count of " + maxCount });
        return;
    }
    return [offset, count];
}

const _checkIfHikingIdExist = function (req, res, hiking) {
    if (hiking) {
        _addRoutePlant(req, res, hiking);
    } else {
        CommonFunctions.fillResponse(response, process.env.STATUS_OK, process.env.HIKING_ID_NOT_FOUND)
        CommonFunctions.sendResponse(response, res)
    }
}

module.exports = {
    _generateHash,
    _fillResponse,
    _sendResponse,
    _userJsonValidation,
    _jsonValidation,
    _responseDeclaration,
    _pagination,
    _validateHiking,
    _checkIfHikingIdExist,
    _checkError
}