const {ctrlWrapper} = require("../helpers");
const {Contact} = require("../models/contacts");
const {HttpError} = require("../helpers");

const getAll = async (req, res) => {
    const {_id: owner} = req.user
    const {page = 1, limit = 10} = req.query
    const contacts = await Contact.find({owner}, "-createdAt -updatedAt", {
        skip: (page - 1) * limit,
        limit
    }).populate("owner", "name, email")// return owner's props name and email
    res.json(contacts)
}

const getById = async (req, res) => {
    const {_id: owner} = req.user
    const contactId = req.params.id
    const contact = await Contact.findById(contactId)
    res.json(contact)
}

const add = async (req, res) => {
    const {_id: owner} = req.user
    const contact = await Contact.create({...req.body, owner})
    res.status(201).json(contact)
}

const updateById = async (req, res) => {
    const contactId = req.params.id
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!updatedContact) {
        throw HttpError({status: 404, message: "Contact not found"})
    }
    res.json(updatedContact);
}

const updateFavoriteById = async (req, res) => {
    const contactId = req.params.id
    const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
    if (!updatedContact) {
        throw HttpError({status: 404, message: "Contact not found"})
    }
    res.json(updatedContact);
}

const deleteById = async (req, res) => {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndRemove(contactId);
    if (!deletedContact) {
        throw HttpError({status: 404, message: "Contact not found"})
    }
    res.json(deletedContact)
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    updateFavoriteById: ctrlWrapper(updateFavoriteById),
    deleteById: ctrlWrapper(deleteById),
}