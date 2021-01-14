const siteConfig = require('../config/site-config');


class AuthController {
    static login(req, res) {
        console.log(req.body);
        res.render('home', {
            layout: "auth",
            siteConfig: siteConfig
        });
    }
}


module.exports = AuthController;