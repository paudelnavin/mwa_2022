const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
const CommonFunctions = require("../../shared/shared.functions");

const _addRoutesPlant = function (req, hiking) {
    let newPlant = {
        name: req.body.name,
        description: req.body.description,
        location: {
            coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
        }
    }
    hiking.route_plants.push(newPlant)
    return hiking;
}

const addHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    let response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then((hiking) => _addRoutesPlant(req, hiking))
        .then((addedHiking) => addedHiking.save())
        .then(savedHiking => CommonFunctions._fillResponse(response, process.env.STATUS_OK, savedHiking))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { "message": "Hiking Id not valid" }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const getAllHikingsRoutePlants = function (req, res) {
    const hikingId = req.params.hikingId;
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then((hiking) => CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking.route_plants))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_OK, { "message": "Hiking Id is not valid" }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const getOneHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    const plantId = req.params.plantId;
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking => CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking.route_plants.id(plantId)))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { "message": "Hiking Id is not valid" }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const _updateOne = function (req, res, routePlantUpdateCallback) {
    const hikingId = req.params.hikingId
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking => routePlantUpdateCallback(req, res, hiking.route_plants))
        .then(editedRoutePlant => editedRoutePlant.save())
        .then(savedRoutePlant => CommonFunctions._fillResponse(response, process.env.STATUS_OK, savedRoutePlant))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { "message": "Hiking Id is not valid" }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const _fullRoutePlantUpdate = function (req, routePlant) {
    routePlant.name = req.body.name;
    routePlant.description = req.body.description;
    routePlant.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];

    return routePlant
}

const _partialRoutePlantUpdate = function (req, routePlant) {
    if (req.body.name) {
        routePlant.name = req.body.name;
    }
    if (req.body.description) {
        routePlant.description = req.body.description;
    }
    if (req.body.lng && req.body.lat) {
        routePlant.location.coordinates = [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)];
    }

    return routePlant;
}

const fullUpdateHikingRoutePlant = function (req, res) {
    _updateOne(req, res, _fullRoutePlantUpdate)
}

const partialUpdateHikingRoutePlant = function (req, res) {
    _updateOne(req, res, _partialRoutePlantUpdate)
}

const deleteAllHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking => hiking.route_plants=[])
        .then(()=>CommonFunctions._fillResponse(response, process.env.STATUS_OK, {"message":"Successfully deleted"}))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { "message": "Hiking Id is not valid" }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const deleteOneHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId
    const plantId = req.params.plantId
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking =>  hiking.route_plants.remove(plantId))
        .then(()=>CommonFunctions._fillResponse(response, process.env.STATUS_OK, {"message":"Successfully deleted"}))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { "message": "Hiking Id is not valid" }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

module.exports = {
    addHikingRoutePlant,
    getAllHikingsRoutePlants,
    getOneHikingRoutePlant,
    fullUpdateHikingRoutePlant,
    partialUpdateHikingRoutePlant,
    deleteAllHikingRoutePlant,
    deleteOneHikingRoutePlant
}