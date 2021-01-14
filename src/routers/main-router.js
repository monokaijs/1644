const siteConfig = require('../config/site-config');
function router(app) {
    app.get('/', function (req, res) {
        res.render('home', {
            siteConfig: siteConfig
        });
    });
}
module.exports = router;