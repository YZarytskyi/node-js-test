const {Schema, model} = require('mongoose');
const Joi = require("joi");

const {handleMongooseError} = require('../helpers');

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favourite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {versionKey: false, timestamps: true})

contactSchema.post("save", handleMongooseError)

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favourite: Joi.boolean(),
})

const updateFavoriteScheme = Joi.object({
    favorite: Joi.boolean().required()
})

const schemas = {addSchema, updateFavoriteScheme}

const Contact = model('contact', contactSchema);

module.exports = {Contact, schemas}