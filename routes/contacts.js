const express = require("express");

const ctrl = require("../controllers/contacts");

const {validateBody} = require("../middlewares");

const {contactSchema} = require("../schemas/contacts");

const router = express.Router()

router.get("/", ctrl.getAll)

router.get("/:id", ctrl.getById)

router.post("/", validateBody(contactSchema), ctrl.add)

router.put("/:id", validateBody(contactSchema), ctrl.updateById)

router.delete("/:id", ctrl.deleteById)

module.exports = router