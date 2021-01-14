const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const AuthController = require("../controllers/auth-controller");
function authRouter (app) {
    app.get('/auth/login/', AuthController.login);
    app.post('/auth/login/', urlencodedParser, AuthController.login);
}

module.exports = authRouter;