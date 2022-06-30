const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);

const addHiking = function (req, res) {
    const arr = req.body.routePlants;
    const newHiking = {
        name: req.body.name,
        endpoint1: req.body.endpoint1,
        endpoint2: req.body.endpoint2,
        state: req.body.state,
        length: req.body.length,
        length_unit: req.body.length_unit
    }
    Hiking.create(newHiking, function (err, hiking) {
        const response = { status: process.env.STATUS_SUCCESSFULLY_CREATED, message: hiking };
        if (err) {
            console.log("Error creating game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        res.status(response.status).json(response.message);
    });

}
const getAllHikings = function (req, res) {
    let offset = process.env.DEFAULT_FIND_OFFSET;
    let count = process.env.DEFAULT_FIND_COUNT;
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
    Hiking.find().skip(offset).limit(count).exec(function (err, hikings) {
        if (err) {
            console.log(err);
        }
        if (count > hikings.length) {
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Total lenght of Hiking is " + hikings.length });
            return;
        }
        console.log("Found Hikings ", hikings.length);
        res.status(process.env.STATUS_OK).json(hikings);
    });
}

const getOneHiking = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).exec(function (err, hiking) {
        if (err) {
            console.log("Error finding game");
            res.status(process.env.STATUS_INTERNAL_ERROR).json({ "message": "It is not a valid Id" });
        } else if (!hiking) {
            console.log("Hiking id not found");
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Hiking ID not found" });
        } else {
            console.log("Found One hiking " + hiking);
            res.status(process.env.STATUS_OK).json(hiking);
        }
    });
}

const _updateOne = function (req, res, updateHikingCallback) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).exec(function (err, hiking) {
        const response = {
            status: process.env.STATUS_OK,
            message: hiking
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = { "message": "Game Id is not valid" };
        } else if (!hiking) {
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Game Id not found" };
        }
        if (response.status != process.env.STATUS_OK) {
            res.status(response.status).json(response.message)
        } else {
            updateHikingCallback(req, res, hiking, response)
        }
    })
}

const fullUpdateHiking  =function(req ,res){
    hikingUpdate = function (req, res, hiking, response) {
        hiking.name= req.body.name;
        hiking.endpoint1= req.body.endpoint1;
        hiking.endpoint2= req.body.endpoint2;
        hiking.state= req.body.state;
        hiking.length= req.body.length;
        hiking.length_unit= req.body.length_unit;

        hiking.save(function (err, updatedHiking) {
            if (err) {
                response.status = process.env.STATUS_INTERNAL_ERROR
                response.message = err;
            } else {
                response.status = process.env.STATUS_OK
                response.message = updatedHiking
            }
            console.log(updatedHiking);
            res.status(response.status).json(response.message)
        })
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

        hiking.save(function (err, updatedHiking) {
            if (err) {
                response.status = process.env.STATUS_INTERNAL_ERROR
                response.message = err;
            } else {
                response.status = process.env.STATUS_OK
                response.message = updatedHiking
            }
            console.log(updatedHiking);
            res.status(response.status).json(response.message)
        })
    }
    _updateOne(req, res, hikingUpdate)
}

const deleteOneHiking = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findByIdAndDelete(hikingId).exec(function (err, deletedhiking) {
        const response = { status: process.env.STATUS_OK, message: deletedhiking }
        if (err) {
            console.log("Error during deletion");
            res.status(process.env.STATUS_INTERNAL_ERROR).json({ "message": "It is not a valid Id" })
        } else if (!deletedhiking) {
            console.log("Hiking id not found");
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Hiking ID not found" });
        } else {
            res.status(response.status).json({ "message": "succesfully deleted below hiking " + response.message });
        }
    });
}

const deleteAllHikings = function (req, res) {
    Hiking.deleteMany({}, function (err, hikings) {
        const response = { status: process.env.STATUS_OK, message: hikings };
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else {
            res.status(response.status).json({ "message": "successfully deleted documnet" });
        }
    });
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