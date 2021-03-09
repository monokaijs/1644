const siteConfig = require('../config/site-config');
function router(app) {
    app.get('/', function (req, res) {
        res.render("home", {
            layout: "main",
            siteConfig: siteConfig,
            session: req.session
        });
    });
    app.get('/account/', function (req, res) {
        let sessionData = req.session;
        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        }
        res.render('account/account', {
            layout: 'main',
            siteConfig: siteConfig,
            session: req.session
        });
    });
    app.get('/manage/', function (req, res) {
        let sessionData = req.session;
        if (!sessionData['isLoggedIn']) {
            res.redirect('/manage/');
        }
        res.render('manage/manage', {
            layout: 'main',
            siteConfig: siteConfig,
            session: req.session
        });
    });
}
module.exports = router;