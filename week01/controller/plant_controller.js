const mongoose = require("mongoose");
const Hiking = mongoose.model(process.env.HIKING_MODEL);

const addHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        console.log("Found hiking " + hiking);
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error Finding plant");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding plant");
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
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding plant");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding plant");
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
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding plant");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding plant");
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

const _updateOne = function (req, res, routePlantUpdateCallback) {
    const hikingId = req.params.hikingId
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        const response = { status: process.env.STATUS_OK, message: hiking }
        if (err) {
            console.log("Error Finding plant");
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        } else if (!hiking) {
            console.log("Plant with given ID not found");
            response.status = process.env.STATUS_NOT_FOUND
            response.message = { message: "Plant ID not found" }
        }
        if (response.status != process.env.STATUS_OK) {
            res.status(response.status).json(response.message)
        }
        console.log("I am sending this hiking "+hiking);
        routePlantUpdateCallback(req, res, hiking)
    })
}

const _fullRoutePlantUpdate = function (req, res, hiking) {
    const plantId = req.params.plantId;
    for(i=0; i<hiking.routePlants.length; i++){
        if(hiking.routePlants[i].id==plantId){
            hiking.routePlants[i].name = req.body.name;
            hiking.routePlants[i].description = req.body.description;
        }
    }
   
    hiking.save(function (err, updatedPlant) {
        const response = {
            status: process.env.STATUS_OK,
            message: updatedPlant.routePlants
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        }
        res.status(response.status).json(response.message)
    })
}

const _partialRoutePlantUpdate = function (req, res, hiking) {
    const plantId = req.params.plantId;
    for(i=0; i<hiking.routePlants.length; i++){
        if(hiking.routePlants[i].id==plantId){
            if (req.body.name) {
                hiking.routePlants[i].name = req.body.name;
            }
            if (req.body.description) {
                hiking.routePlants[i].description = req.body.description;
            }
        }
    }

    hiking.save(function (err, updatedPlant) {
        const response = {
            status: process.env.STATUS_OK, message: updatedPlant.routePlants
        }
        if (err) {
            response.status = process.env.STATUS_INTERNAL_ERROR
            response.message = err
        }

        res.status(response.status).json(response.message)
    })
}

const fullUpdateHikingRoutePlant = function (req, res) {
    _updateOne(req, res, _fullRoutePlantUpdate)
}

const partialUpdateHikingRoutePlant = function (req, res) {
    _updateOne(req, res, _partialRoutePlantUpdate)
}

const deleteAllHikingRoutePlant = function (req, res) {
    const hikingId = req.params.hikingId;
    Hiking.findById(hikingId).select("routePlants").exec(function (err, hiking) {
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding plant");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding plant");
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
        const response = { status: process.env.STATUS_OK, message: hiking };
        if (err) {
            console.log("Error finding plant");
            response.status = process.env.STATUS_INTERNAL_ERROR;
            response.message = err;
        }
        if (!hiking) {
            console.log("Error finding plant");
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
    addHikingRoutePlant,
    getAllHikingsRoutePlants,
    getOneHikingRoutePlant,
    fullUpdateHikingRoutePlant,
    partialUpdateHikingRoutePlant,
    deleteAllHikingRoutePlant,
    deleteOneHikingRoutePlant
}