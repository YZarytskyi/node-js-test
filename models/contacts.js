const fs = require('fs/promises');
const path = require('node:path');
const {nanoid} = require("nanoid");

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8")
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
}

async function getContactById(contactId) {
    try {
        const data = await fs.readFile(contactsPath, "utf-8")
        return JSON.parse(data).find((contact) => contact.id === contactId)
    } catch (error) {
        console.log(error)
    }
}

async function removeContact(contactId) {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"))
        const selectedContactIndex = data.findIndex((contact) => contact.id === contactId)
        if (selectedContactIndex === -1) {
            return
        }
        const deletedContact = data.splice(selectedContactIndex, 1)[0]
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8")

        return deletedContact || null
    } catch (error) {
        console.log(error)
    }
}

async function addContact(name, email, phone) {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"))
        const newContact = {id: nanoid(), name, email, phone}
        data.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8")

        return newContact
    } catch (error) {
        console.log(error)
    }
}

async function updateContact({contactId, name, email, phone}) {
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"))
        const selectedContactIndex = data.findIndex((contact) => contact.id === contactId)
        if (selectedContactIndex === -1) {
            return null
        }
        const updatedContact = {id: contactId, name, email, phone}
        data.splice(selectedContactIndex, 1, updatedContact)
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8")

        return updatedContact
    } catch
        (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact
}