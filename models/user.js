const {Schema, model} = require('mongoose');
const Joi = require("joi");

const {handleMongooseError} = require('../helpers');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Set password for user'],
        minLength: 6,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: "",
    }
}, {versionKey: false, timestamps: true});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})

const schemas = {registerSchema, loginSchema}

const User = model('user', userSchema);

module.exports = {User, schemas}