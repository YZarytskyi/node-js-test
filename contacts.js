const fs = require('fs/promises');
const path = require('node:path');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath, "utf-8")
        console.table(JSON.parse(data))
    } catch (error) {
        console.log(error)
    }
}

async function getContactById(contactId) {
    // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const data = await fs.readFile(contactsPath, "utf-8")
        const selectedContact = JSON.parse(data).find((contact) => contact.id === contactId)
        console.table(selectedContact || null)
    } catch (error) {
        console.log(error)
    }
}

async function removeContact(contactId) {
    // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"))
        const selectedContactIndex = data.findIndex((contact) => contact.id === contactId)
        if (selectedContactIndex === -1) {
            console.log("Element not found")
            return
        }
        const deletedContact = data.splice(selectedContactIndex, 1)[0]
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8")

        console.table(deletedContact)
        console.table(data)
    } catch (error) {
        console.log(error)
    }
}

async function addContact(name, email, phone) {
    // ...твій код. Повертає об'єкт доданого контакту.
    try {
        const data = JSON.parse(await fs.readFile(contactsPath, "utf-8"))
        const newContact = { id: data.length + 1, name, email, phone }
        data.push(newContact)
        await fs.writeFile(contactsPath, JSON.stringify(data), "utf-8")

        console.table(data)
        console.log(newContact)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}