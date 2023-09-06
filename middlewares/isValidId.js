const {isValidObjectId} = require("mongoose");
const {HttpError} = require("../helpers");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(isValidObjectId(id)) {
        next(HttpError({status: 400, message: `${id} is not a valid id`}));
    }
}

module.exports = isValidId