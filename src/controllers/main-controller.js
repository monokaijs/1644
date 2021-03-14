const siteConfig = require('../config/site-config');
const Database = require("../utils/database");

class MainController {
    static AddProduct(req, res) {
        let sessionData = req.session;
        let response = {};
        let render = () => res.render('manage/add-product', {
            layout: 'main',
            siteConfig: siteConfig,
            session: req.session,
            response: response
        });

        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        } else {
            let form = req.body;
            if (form.name !== "" && form.image !== "" && form.price !== "" && form.category !== "") {
                Database.addProduct(form.name, form.image, form.price, form.category).then(() => {
                    res.redirect('/manage/products/');
                }).catch(e => {
                    res.msg = "Error occurred!";
                });
            } else {
                response.msg = "Missing information.";
            }
            render();
        }
    }
    static ManageProduct(req, res) {
        let sessionData = req.session;
        let response = {};

        if (!sessionData['isLoggedIn']) {
            res.redirect('/login/');
        } else {
            let form = req.body;
            Database.removeProduct(form['delete-product']).then(() => {
                Database.getProducts().then(products => {
                    res.render('manage/products', {
                        layout: 'main',
                        siteConfig: siteConfig,
                        session: req.session,
                        response: response,
                        products: products
                    });
                });
            });
        }
    }
}

module.exports = MainController;