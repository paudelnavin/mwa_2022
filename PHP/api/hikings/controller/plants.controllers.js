const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
const CommonFunctions = require("../../shared/shared.functions");

const _addRoutesPlant = function (req, hiking) {
    let newPlant = {
        name: req.body.name,
        description: req.body.description,
        location: {
            coordinates: [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)]
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
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { message: process.env.INVALID_HIKING_ID }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const getAllHikingsRoutePlants = function (req, res) {
    const hikingId = req.params.hikingId;
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then((hiking) => CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking.route_plants))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_OK, {message: process.env.INVALID_HIKING_ID }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const getOneHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    const plantId = req.params.plantId;
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking => CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking.route_plants.id(plantId)))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { message: process.env.INVALID_HIKING_ID}))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const _updateOne = function (req, res, routePlantUpdateCallback) {
    const hikingId = req.params.hikingId
    const plantId = req.params.plantId
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking => routePlantUpdateCallback(req, hiking, plantId))
        .then(editedHiking => editedHiking.save())
        .then(savedHiking => CommonFunctions._fillResponse(response, process.env.STATUS_OK, savedHiking))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { message: process.env.INVALID_HIKING_ID }))
        .finally(() => CommonFunctions._sendResponse(response, res))
}

const _fullRoutePlantUpdate = function (req, hiking, plantId) {
    for (i = 0; i < hiking.route_plants.length; i++) {
        existingRouteId = (hiking.route_plants[i]._id).toString()
        if (existingRouteId == plantId) {
            hiking.route_plants[i].name = req.body.name;
            hiking.route_plants[i].description = req.body.description;
            hiking.route_plants[i].location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        }
        return hiking
    }
}

const _partialRoutePlantUpdate = function (req, hiking, plantId) {
    for (i = 0; i < hiking.route_plants.length; i++) {
        existingRouteId = (hiking.route_plants[i]._id).toString()
        if (existingRouteId == plantId) {
            console.log(true);
            if (req.body.name) {
                hiking.route_plants[i].name = req.body.name;
            }
            if (req.body.description) {
                hiking.route_plants[i].description = req.body.description;
            }
            if (req.body.location.lng && req.body.location.lat) {
                hiking.route_plants[i].location.coordinates = [parseFloat(req.body.location.lng), parseFloat(req.body.location.lat)];
            }
        }
    }

    return hiking;
}

const fullUpdateHikingRoutePlant = function (req, res) {
    _updateOne(req, res, _fullRoutePlantUpdate)
}

const partialUpdateHikingRoutePlant = function (req, res) {
    _updateOne(req, res, _partialRoutePlantUpdate)
}

const deleteOneHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId
    const plantId = req.params.plantId
    const response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(hiking => _deleteOne(hiking, plantId))
        .then((hiking) => hiking.save())
        .then((hiking) => CommonFunctions._fillResponse(response, process.env.STATUS_OK, { message: process.env.SUCCESSFULLY_DELETED + hiking.route_plants }))
        .catch(() => CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, { message: PLANT_ID_NOT_FOUND }))
        .finally(() => CommonFunctions._sendResponse(response, res));
}

const _deleteOne = function (hiking, plantId) {
    return new Promise((resolve, reject) => {
        let updatedHiking = hiking.route_plants.id(plantId);
        if (updatedHiking == null) {
            reject({ message: process.env.STATUS_NOT_FOUND });
        }
        else {
            hiking.route_plants.id(plantId).remove();
            resolve(hiking);
        }
    })
}

module.exports = {
    addHikingRoutePlant,
    getAllHikingsRoutePlants,
    getOneHikingRoutePlant,
    fullUpdateHikingRoutePlant,
    partialUpdateHikingRoutePlant,
    deleteOneHikingRoutePlant
}