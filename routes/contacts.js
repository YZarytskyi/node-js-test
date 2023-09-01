const express = require("express");
const {listContacts, getContactById, removeContact, addContact} = require("../models/contacts")

const router = express.Router()

router.get("/", (req, res) => {
    const contacts = listContacts()
    res.json(contacts)
})

module.exports = router

router.get(":id", (req, res) => {
    const id = req.params.id
    const contact = getContactById(id)
    res.json(contact)
})