const express = require("express");

const {validateBody, authenticate} = require("../middlewares");
const {schemas} = require("../models/user");
const ctrl = require("../controllers/auth");

const router = express.Router()

router.post('/signup', validateBody(schemas.registerSchema), ctrl.register)

router.post('/login', validateBody(schemas.loginSchema), ctrl.login)

router.get('/current', authenticate, ctrl.current)

router.get('/logout', authenticate, ctrl.logout)

module.exports = router