const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);
const CommonFunctions = require("../../shared/shared.functions");

const addHiking = function (req, res) {
    const newHiking = {
        name: req.body.name,
        endpoint1: req.body.endpoint1,
        endpoint2: req.body.endpoint2,
        state: req.body.state,
        distance: {
            length:req.body.distance.length,
            length_unit:req.body.distance.length_unit
        }  
    }
    let response = CommonFunctions._responseDeclaration();
    if ((req.body && req.body.name && req.body.distance.length && req.body.state) ||
    (req.body.name != "" && req.body.distance.length != "" && req.body.state!="")) {
        Hiking.create(newHiking)
            .then((hiking)=>CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking))
            .catch((error)=>CommonFunctions._fillResponse(response, process.env.STATUS_NOT_FOUND, error))
            .finally(()=>CommonFunctions._sendResponse(response,res))
    }else{
        return res.status(process.env.STATUS_INTERNAL_ERROR).json({ "message": "Name, state and length is required field" });
    }
}

let itemsSize = function(){
    Hiking.find().countDocuments(function(err, count){
        if(err){
            return 0;
        }else{
            return count;   
        }
    })
}
const getAllHikings = function (req, res) {
    if(req.query && req.query.lat && req.query.lng){
        return _runGeoQuery(req, res);
    }
    let response=CommonFunctions._responseDeclaration();
    totalItems = itemsSize();
    let [offset, count] = CommonFunctions._pagination(req, res)
    Hiking.find().skip(offset).limit(count).exec()
        .then(function(hikings){
            if(count < hikings.length) {
                res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Cannot exceed array length. Total lenght of Hiking is " + hikings.length });
                return;
            }else{
                return hikings;
            }
        })
        .then((hikings)=>CommonFunctions._fillResponse(response,parseInt(process.env.STATUS_OK),hikings))
        .catch((error)=>CommonFunctions._fillResponse(response,parseInt(process.env.STATUS_NOT_FOUND),error))
        .finally(()=>CommonFunctions._sendResponse(response,res))    
}

const _runGeoQuery = function(req, res){
    const lng = parseFloat(req.query.lng);
    const lat = parseFloat(req.query.lat);
    if (isNaN(lat) || isNaN(lng)) {
        res.status(500).json({ "message": "QueryString Offset and Count should be in numbers" });
        return;
    }
    let response=CommonFunctions._responseDeclaration();
    //Geo JSON Point
    const point = { 
        type: "Point", 
        coordinates: [lng, lat]
    }
    const query = {
        "routePlants.location.coordinates":{
            $near:{
                $geometry: point,
                $maxDistance : parseFloat(process.env.GEO_SEARCH_MAX_DIST, process.env.BASE_NUMBER),
                $minDistance : parseFloat(process.env.GEO_SEARCH_MIN_DIST, process.env.BASE_NUMBER),
            }
        }
    }
    Hiking.find(query).limit(parseFloat(process.env.DEFAULT_FIND_COUNT, process.env.BASE_NUMBER)).exec()
        .then((hikings)=>CommonFunctions._fillResponse(response,parseInt(process.env.STATUS_OK),hikings))
        .catch((error)=>CommonFunctions._fillResponse(response,parseInt(process.env.STATUS_NOT_FOUND),error))
        .finally(()=>CommonFunctions._sendResponse(response,res))
}

const getOneHiking = function (req, res) {
    const hikingId = req.params.hikingId;
    let response=CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(function(hiking){
            message = CommonFunctions._validateHiking(hiking);
            CommonFunctions._fillResponse(response, process.env.STATUS_OK, message);
        })
        .catch(()=>CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, {"message":"Hiking Id is not valid"}))
        .finally(()=>CommonFunctions._sendResponse(response, res))
}

const _updateOne = function (req, res, updateHikingCallback) {
    const hikingId = req.params.hikingId;
    let response = CommonFunctions._responseDeclaration();
    Hiking.findById(hikingId).exec()
        .then(function(hiking){
            response.message = CommonFunctions._validateHiking(hiking);
            updateHikingCallback(req, res, hiking, response);
        })
        .catch(()=>CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, {"message":"Hiking Id is not valid"}))
}

const fullUpdateHiking  =function(req ,res){
    hikingUpdate = function (req, res, hiking, response) {
        hiking.name= req.body.name;
        hiking.endpoint1= req.body.endpoint1;
        hiking.endpoint2= req.body.endpoint2;
        hiking.state= req.body.state;
        hiking.length.distance= req.body.length.distance;
        hiking.length.length_unit= req.body.length.length_unit;

        hiking.save()
            .then((hiking)=>CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking))
            .catch((error)=>CommonFunctions._fillResponse(response, process.env.STATUS_NOT_FOUND,error))
            .finally(CommonFunctions._sendResponse(response, res))
    }
    _updateOne(req, res, hikingUpdate)
}
const partialUpdateHiking  =function(req ,res){
    hikingUpdate = function (req, res, hiking, response) {
        if(req.body.name){
            hiking.name= req.body.name;
        }
        if(req.body.endpoint1){
            hiking.endpoint1= req.body.endpoint1;
        }
        if(req.body.endpoint2){
            hiking.endpoint2= req.body.endpoint2;
        }
        if(req.body.state){
            hiking.state= req.body.state;
        }
        if(req.body.length){
            hiking.length= req.body.length;
        }
        if(req.body.length_unit){
            hiking.length_unit= req.body.length_unit;
        }
        
        hiking.save()
            .then((hiking)=>CommonFunctions._fillResponse(response, process.env.STATUS_OK, hiking))
            .catch((error)=>CommonFunctions._fillResponse(response, process.env.STATUS_NOT_FOUND,error))
            .finally(CommonFunctions._sendResponse(response, res))

    }
    _updateOne(req, res, hikingUpdate)
}

const deleteOneHiking = function (req, res) {
    const hikingId = req.params.hikingId;
    let response = CommonFunctions._responseDeclaration();
    Hiking.findByIdAndDelete(hikingId).exec()
    .then(function(hiking){
        message = CommonFunctions._validateHiking(hiking);
        CommonFunctions._fillResponse(response, process.env.STATUS_OK, { "message": "succesfully deleted below hiking " + message });
    })
    .catch(()=>CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, {"message":"Hiking Id is not valid"}))
    .finally(()=>CommonFunctions._sendResponse(response, res))
}

const deleteAllHikings = function (req, res) {
    let response = CommonFunctions._responseDeclaration();
    Hiking.deleteMany({})
        .then(()=>CommonFunctions._fillResponse(response, process.env.STATUS_OK, {"message":"Succesfully deleted all hikings"}))
        .catch((error)=>CommonFunctions._fillResponse(response, process.env.STATUS_INTERNAL_ERROR, error))
        .finally(()=>CommonFunctions._sendResponse(response, res))
}

module.exports = {
    addHiking,
    getAllHikings,
    getOneHiking,
    fullUpdateHiking,
    partialUpdateHiking,
    deleteOneHiking,
    deleteAllHikings
}