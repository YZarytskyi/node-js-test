const express = require("express");
const Joi = require("joi");
const {listContacts, getContactById, removeContact, updateContact, addContact} = require("../models/contacts")

const {HttpError} = require("../helpers");

const router = express.Router()

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required()
})

router.get("/", async (req, res, next) => {
    try {
        const contacts = await listContacts()
        res.json(contacts)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const contactId = req.params.id
        const contact = await getContactById(contactId)
        if (!contact) {
            throw HttpError({status: 404, message: "Contact not found"})
        }
        res.json(contact)
    } catch (error) {
        next(error)
    }

})

router.post("/", async (req, res, next) => {
    try {
        const {error} = addSchema.validate(req.body)
        if (error) {
            throw HttpError({status: 400, message: error.message})
        }

        const {name, email, phone} = req.body
        const contact = await addContact(name, email, phone)
        res.status(201).json(contact)
    } catch (error) {
        next(error)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const {error} = addSchema.validate(req.body)
        if (error) {
            throw HttpError({status: 400, message: error.message})
        }

        const contactId = req.params.id
        const updatedContact = await updateContact({contactId, ...req.body})
        if (!updatedContact) {
            throw HttpError({status: 404, message: "Contact not found"})
        }
        res.json(updatedContact);
    } catch (error) {
        next(error)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await removeContact(contactId);
        if (!deletedContact) {
            throw HttpError({status: 400, message: "Contact not found"})
        }
        res.json(deletedContact)
    } catch (error) {
        next(error)
    }
})

module.exports = router