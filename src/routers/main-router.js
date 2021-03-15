const siteConfig = require('../config/site-config');
const MainController = require('../controllers/main-controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Database = require('../utils/database');

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
            res.redirect('/login/');
        }
        res.render('manage/manage', {
            layout: 'main',
            siteConfig: siteConfig,
            session: req.session
        });
    });
    app.get('/manage/products/:productId/', function (req, res) {
        let sessionData = req.session;
        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        } else {
            Database.getProducts().then(products => {
                res.render('manage/edit-product', {
                    layout: 'main',
                    siteConfig: siteConfig,
                    session: req.session,
                    products: products
                });
            }).catch(console.log);
        }
    });
    app.post('/manage/products/:productId/', urlencodedParser, MainController.EditProduct);

    app.get('/manage/products/', function (req, res) {
        let sessionData = req.session;
        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        } else {
            Database.getProducts().then(products => {
                res.render('manage/products', {
                    layout: 'main',
                    siteConfig: siteConfig,
                    session: req.session,
                    products: products
                });
            }).catch(console.log);
        }
    });
    app.post('/manage/products/', urlencodedParser, MainController.ManageProduct);

    app.get('/manage/add-product/', function (req, res) {
        let sessionData = req.session;
        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        }
        Database.getCategories().then(categories => {
            res.render('manage/add-product', {
                layout: 'main',
                siteConfig: siteConfig,
                session: req.session,
                categories: categories
            });
        });
    });

    app.post('/manage/add-product/', urlencodedParser, MainController.AddProduct);

    app.get('/manage/categories/', function (req, res) {
        let sessionData = req.session;
        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        }
        Database.getCategories().then(categories => {
            res.render('manage/categories', {
                layout: 'main',
                siteConfig: siteConfig,
                session: req.session,
                categories: categories
            });
        });
    });

    app.post('/manage/categories/', urlencodedParser, MainController.ManageCategories);
}
module.exports = router;