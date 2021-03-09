const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const AuthController = require("../controllers/auth-controller");
function authRouter (app) {
    app.get('/login/', AuthController.login);
    app.post('/login/', urlencodedParser, AuthController.login);

    app.get('/register/', AuthController.register);
    app.post('/register/', urlencodedParser, AuthController.register);
}

module.exports = authRouter;