const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {ctrlWrapper} = require("../helpers");
const {User} = require("../models/user");
const {HttpError} = require("../helpers");

const {SECRET_KEY} = process.env

const register = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (user) {
        throw HttpError({status: 409, message: "User with this email already exists"})
    }

    const hashPassword = await bcryptjs.hash(password, 10)

    const newUser = await User.create({...req.body, password: hashPassword})
    res.status(201).json({email: newUser.email, name: newUser.name, subscription: newUser.subscription})
}

const login = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    if (!user) {
        throw HttpError({status: 401, message: "Email or password is wrong"})
    }
    const isValidPassword = await bcryptjs.compare(password, user.password)
    if (!isValidPassword) {
        throw HttpError({status: 401, message: "Email or password is wrong"})
    }

    const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn: "23h"})
    await User.findByIdAndUpdate(user._id, {token})

    res.status(200).json({token, user: {email: user.email, name: user.name, subscription: user.subscription}})
}

const current = (req, res) => {
    const {email, name, subscription} = req.user
    res.json({email, name, subscription})
}

const logout = async (req, res) => {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: ""})
    res.json({
        message: "Successfully logged out"
    })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    current: ctrlWrapper(current),
    logout: ctrlWrapper(logout),
}