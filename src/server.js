const express = require('express');
const hbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const router = require('./routers/main-router');
const authRouter = require('./routers/auth-router');
const path = require('path');
const siteConfig = require('./config/site-config');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const {MongoClient} = require('mongodb');
const Database = require('./utils/database');
const md5 = require('md5');

Database.initialize(md5);

// === initializing the application
const app = express();

app.engine('.hbs', hbs({
    extname: '.hbs',
    helpers: require('./utils/hbs-helper')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: siteConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
    maxAge: Date.now() + (30 * 86400 * 1000),
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: null
    },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
    })
}))

authRouter(app);
router(app);
let uri = "mongodb+srv://admin:Mongo123@cluster0.ifklf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let client = new MongoClient(uri);

// connect to database
Database.connect(client).then(() => {
    console.log("Successfully established connection!");
    // establish the server
    const SERVER_PORT = process.env.PORT || 3000;
    const SERVER_HOST = process.env.YOUR_HOST || '0.0.0.0';
    app.listen(SERVER_PORT, SERVER_HOST, function() {
        console.log('Listening on port %d', SERVER_PORT);
    });

    Database.getProducts().then(console.log);
});