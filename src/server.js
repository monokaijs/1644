const express = require('express');
const hbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const router = require('./routers/main-router');
const authRouter = require('./routers/auth');
const path = require('path');
const siteConfig = require('./config/site-config');
const session = require('express-session')

// === initializing the application
const app = express();

app.engine('.hbs', hbs({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: siteConfig.sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: null
    },
}))

authRouter(app);
router(app);

const SERVER_PORT = process.env.YOUR_PORT || process.env.PORT || 80;
const SERVER_HOST = process.env.YOUR_HOST || '0.0.0.0';
app.listen(SERVER_PORT, SERVER_HOST, function() {
    console.log('Listening on port %d', SERVER_PORT);
});