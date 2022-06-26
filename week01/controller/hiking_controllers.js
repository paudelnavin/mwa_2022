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
    if(isNaN(offset) || isNaN(count)){
        res.status(process.env.STATUS_NOT_FOUND).json({"message": "QueryString Offset and Count should be in numbers"});
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
            res.status(process.env.STATUS_INTERNAL_ERROR).json({"message":"It is not a valid Id"});
        } else if (!hiking) {
            console.log("Hiking id not found");
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Hiking ID not found" });
        } else {
            console.log("Found One hiking " + hiking);
            res.status(process.env.STATUS_OK).json(hiking);
        }
    });
}

const updateHiking = function (req, res) {
    const hikingId = req.params.hikingId;
    const updateHiking = {
        name: req.body.name,
        endpoint1: req.body.endpoint1,
        endpoint2: req.body.endpoint2,
        state: req.body.state,
        length: req.body.length
    }
    Hiking.findByIdAndUpdate(hikingId, updateHiking).exec(function (err, hiking) {
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error Updating game");
            response.status = STATUS_INTERNAL_ERROR;
            response.message = err;
            res.status(process.env.STATUS_INTERNAL_ERROR).json({"message":"It is not a valid Id"})
        }else if (!hiking) {
            console.log("Hiking id not found");
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Hiking ID not found" });
        }else{
            res.status(response.status).json(response.message);
        }
        
    });
}

const deleteHiking = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findByIdAndDelete(hikingId).exec(function (err, deletedhiking) {
        const response = { status: process.env.STATUS_OK, message: deletedhiking }
        if(err) {
            console.log("Error during deletion");
            res.status(process.env.STATUS_INTERNAL_ERROR).json({"message":"It is not a valid Id"})
        }else if(!deletedhiking){
            console.log("Hiking id not found");
            res.status(process.env.STATUS_NOT_FOUND).json({ "message": "Hiking ID not found" });
        }else{
            res.status(response.status).json({"message":"succesfully deleted below hiking " + response.message});
        }
    });
}

const addHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found hiking " + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error Finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + hikingId };
        }
        if (hiking) {
            _addRoutePlant(req, res, hiking);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const _addRoutePlant = function (req, res, hiking) {
    const newPlant = {
        name: req.body.name,
        description: req.body.description
    }
    hiking.routePlants.push(newPlant);
    hiking.save(function (err, updateHiking) {
        const response = { status: process.env.STATUS_OK, message: [] };
        if (err) {
            console.log("Could not update");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else {
            response.status = process.env.STATUS_SUCCESSFULLY_CREATED;
            response.message = updateHiking.routePlants;
        }
        res.status(response.status).json(response.message);
    });
}

const getAllHikingsRoutePlants = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found routePlants " + hiking.routePlants + " for hikings" + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + hikingId };
        }
        if (hiking) {
            res.status(response.status).json(hiking.routePlants);
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const getOneHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    const plantId = req.params.plantId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found routePlants " + hiking.routePlants.id(plantId) + " for hikings" + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + hikingId };
        }
        if (hiking) {
            res.status(response.status).json(hiking.routePlants.id(plantId));
        } else {
            res.status(response.status).json(response.message);
        }
    });
}

const UpdateHikingRoutePlant = function (req, res) {
    const plantId = req.params.plantId;
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found routePlants " + hiking.routePlants.id(plantId) + " for hikings" + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + hikingId };
        }
        if (hiking) {
            _updataRoutePlant(req, res, hiking);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}

const _updataRoutePlant = function (req, res, hiking) {
    hiking.routePlants.id(req.params.id).name = req.body.name;
    hiking.routePlants.id(req.params.id).description = req.body.description;
    hiking.save(function (err, updateHiking) {
        const response = { status: process.env.STATUS_OK, message: [] };
        if (err) {
            console.log("Could not update");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else {
            response.status = process.env.STATUS_OK;
            response.message = updateHiking.routePlants;
        }
        res.status(response.status).json(response.message);
    });
}

const deleteAllHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found routePlants " + hiking.routePlants + " for hikings" + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + hikingId };
        }
        if (hiking) {
            _deleteRoutePlant(req, res, hiking);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}

const _deleteRoutePlant = function (req, res, hiking) {
    hiking.routePlants = [];
    hiking.save(function (err, updateHiking) {
        const response = { status: process.env.STATUS_DELETED, message: [] };
        if (err) {
            console.log("Could not delete");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else {
            response.status = process.env.STATUS_OK;
            response.message = updateHiking.routePlants;
        }
        res.status(response.status).json(response.message);
    });
}

const deleteOneHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    const plantId = req.params.plantId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found routePlants " + hiking.routePlants.id(plantId) + " for hikings" + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding game");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding game");
            response.status = process.env.STATUS_NOT_FOUND;
            response.message = { "message": "Hiking Id not found " + hikingId };
        }
        if (hiking) {
            _deleteOneRoutePlant(req, res, hiking);
        } else {
            res.status(response.status).json(response.message);
        }

    });
}
const _deleteOneRoutePlant = function (req, res, hiking) {
    var doc = hiking.routePlants.id(req.params.plantId).remove();
    hiking.save(function (err, updateHiking) {
        const response = { status: process.env.STATUS_DELETED, message: [] };
        if (err) {
            console.log("Could not delete");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        } else {
            response.status = process.env.STATUS_OK;
            response.message = updateHiking.routePlants;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    addHiking,
    getAllHikings,
    getOneHiking,
    updateHiking,
    deleteHiking,
    addHikingRoutePlant,
    getAllHikingsRoutePlants,
    getOneHikingRoutePlant,
    UpdateHikingRoutePlant,
    deleteAllHikingRoutePlant,
    deleteOneHikingRoutePlant
}