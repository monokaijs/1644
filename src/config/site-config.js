exports = module.exports = {
    name: "Toys Store",
    sessionSecret: 'mastered production hell',
    phoneNumber: '(+84) 946 024 989',
    phoneNumberTrimmed: '+84946024989',
    aside: [{
        icon: "",
        title: "Dashboard",
    }],
    menu: [{
        title: "Home",
        url: "/"
    }, {
        title: "Products",
        url: "/products/",
        submenu: [{
            title: "New Products",
            url: "/products/new/"
        }]
    }, {
        title: "About",
        url: "/about/"
    }, {
        title: "Contact",
        url: "/contact/"
    }]
};