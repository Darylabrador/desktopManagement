const express              = require('express');
const path                 = require('path');
const cookieParser         = require('cookie-parser');
const logger               = require('morgan');
const dotenv               = require('dotenv').config();
const session              = require('express-session');
const flash                = require('connect-flash');
const isAuth               = require('./middlewares/is-auth');
const databaseConnection   = require('./config/database');

// Models imports
const User    = require('./models/user');
const Client  = require('./models/client');
const Desktop = require('./models/desktop');
const Assign  = require('./models/assign');

// implement relationship



// Routes imports


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable middlewares
app.use(
    session({
        name: 'sbCo',
        secret: 'P8fSnrPNwkiwd5iGCAdKUd!KEeJHPU2ysQIdiTcUa#DaXjHIBrPi',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 3600 * 3 // 3 hours
        }
    })
);

app.use(flash());

// Routes handler


// Database initialisation
databaseConnection
    // .sync({ force: true })
    .sync()
    .then(result => {
        console.log('database connection is ok');
    }).catch(err => {
        console.log('an error occursed', err);
    });

module.exports = app;