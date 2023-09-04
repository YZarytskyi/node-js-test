const Joi = require("joi");

const {listContacts, addContact, getContactById, updateContact, removeContact} = require("../models/contacts");
const {HttpError, ctrlWrapper} = require("../helpers");

const getAll = async (req, res) => {
    const contacts = await listContacts()
    res.json(contacts)
}

const getById = async (req, res) => {
    const contactId = req.params.id
    const contact = await getContactById(contactId)
    if (!contact) {
        throw HttpError({status: 404, message: "Contact not found"})
    }
    res.json(contact)
}

const add = async (req, res) => {
    const {name, email, phone} = req.body
    const contact = await addContact(name, email, phone)
    res.status(201).json(contact)
}

const updateById = async (req, res) => {
    const contactId = req.params.id
    const updatedContact = await updateContact({contactId, ...req.body})
    if (!updatedContact) {
        throw HttpError({status: 404, message: "Contact not found"})
    }
    res.json(updatedContact);
}

const deleteById = async (req, res) => {
    const contactId = req.params.id;
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
        throw HttpError({status: 400, message: "Contact not found"})
    }
    res.json(deletedContact)
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    updateById: ctrlWrapper(updateById),
    deleteById: ctrlWrapper(deleteById),
}