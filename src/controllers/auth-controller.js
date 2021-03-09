const siteConfig = require('../config/site-config');
const Validator = require("../utils/validator");
const Database = require("../utils/database");

class AuthController {
    static login(req, res) {
        let sessionData = req.session;
        if (sessionData['isLoggedIn']) {
            res.redirect('/');
        } else {
            let form = req.body;
            let response = {
                message: "",
                status: 'success'
            }
            let renderPage = () => res.render('auth/login', {
                layout: "auth",
                siteConfig: siteConfig,
                response: response
            });
            if (form && typeof form['submit-btn'] !== 'undefined') {
                Database.login(form['email'], form['password']).then(account => {
                    req.session.isLoggedIn = true;
                    req.session.account = account;

                    res.redirect("/");
                }).catch(err => {
                    response.message = err;
                    renderPage();
                });
            } else {
                renderPage();
            }
        }
    }
    static register(req, res) {
        let sessionData = req.session;
        if (sessionData['isLoggedIn']) {
            res.redirect('/');
        } else {
            let form = req.body;
            let response = {
                message: "",
                status: 'success'
            }
            let renderPage = () => res.render('auth/register', {
                layout: "auth",
                siteConfig: siteConfig,
                response: response
            });
            if (form && typeof form['submit-btn'] !== 'undefined') {
                // form was submitted along with data
                if (form['password'] === "" || form['password'] !== form['confirm-password']) {
                    response.status = "failed";
                    response.message = "Password and confirm password are not the same";
                } else {
                    if (Validator.password(form['password'])) {
                        if (Validator.email(form['email'])) {
                            if (Validator.name(form['first-name']) && Validator.name(form['last-name'])) {
                                Database.createAccount(
                                    form['first-name'],
                                    form['last-name'],
                                    form['email'],
                                    form['password']
                                ).then(() => {
                                    res.redirect("/login/");
                                }).catch(err => {
                                    response.status = "failed";
                                    response.message = err;
                                    renderPage();
                                });
                            } else {
                                response.status = "failed";
                                response.message = "Account name may not valid!";
                                renderPage();
                            }
                        } else {
                            response.status = "failed";
                            response.message = "Email is not valid.";
                            renderPage();
                        }
                    } else {
                        response.status = "failed";
                        response.message = "Password is not valid, please use 6 characters or more.";
                        renderPage();
                    }
                }
            }
        }
    }
}


module.exports = AuthController;