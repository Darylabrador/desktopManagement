const express              = require('express');
const path                 = require('path');
const cookieParser         = require('cookie-parser');
const logger               = require('morgan');
const dotenv               = require('dotenv').config();
const session              = require('express-session');
const flash                = require('connect-flash');
const isAuth               = require('./middlewares/is-auth');
const databaseConnection   = require('./config/database');
const bcrypt               = require('bcryptjs');
const SequelizeStore       = require("connect-session-sequelize")(session.Store);


// Models imports
const User    = require('./models/user');
const Client  = require('./models/client');
const Desktop = require('./models/desktop');
const Assign  = require('./models/assign');

// implement relationship
Client.hasMany(Assign);
Desktop.hasMany(Assign, { onDelete: "cascade" });
Assign.belongsTo(Client);
Assign.belongsTo(Desktop);

// Routes imports
const authRoutes    = require('./routes/authRoutes');
const clientRoutes  = require('./routes/clientRoutes');
const desktopRoutes = require('./routes/desktopRoutes');
const assignRoutes  = require('./routes/assignRoutes');
const generalRoutes = require('./routes/generalRoutes');

// error handler
const errorController = require('./controllers/errorController');

const app = express();

// Session storage :
const { Sequelize, DataTypes, Model } = require('sequelize');

var Session = databaseConnection.define('Session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.STRING,
    expires: Sequelize.DATE,
    data: Sequelize.STRING(50000)
});

function extendDefaultFields(defaults, session) {
    return {
        data: defaults.data,
        expires: defaults.expires,
        userId: session.userId
    };
}

var myStore = new SequelizeStore({
    db: databaseConnection,
    table: 'Session',
    checkExpirationInterval: 1000 * 60 * 15, // The interval at which to cleanup expired sessions in milliseconds.
    expiration: 1000 * 3600 * 3,  // The maximum age (in milliseconds) of a valid session.
    extendDefaultFields: extendDefaultFields
});

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
        store: myStore,
        cookie: {
            sameSite: true,
            maxAge: 1000 * 3600 * 5 // 5 hours
        }
    })
);


app.use(flash());
myStore.sync();

// Message flash
app.use((req, res, next) => {
    res.locals.success_message = req.flash('success');
    res.locals.error_message   = req.flash('error');
    next();
});


// Routes handler
app.use(authRoutes);
app.use(isAuth, generalRoutes);
app.use('/dashboard', isAuth, clientRoutes);
app.use('/dashboard', isAuth, desktopRoutes);
app.use('/dashboard', isAuth, assignRoutes);
app.use(errorController.get404);

// general error handler (all except 404)
app.use((error, req, res, next) => {
    console.log(error)
    res.status(error.httpStatusCode).render('error', {
        statusCode: error.httpStatusCode
    });
});

// Database initialisation
var fakeAdminMail = "admin@gmail.com";

databaseConnection
    // .sync({ force: true })
    .sync()
    .then(() => {
        return User.findOne({ where: { mail: fakeAdminMail }});
    })
    .then((user) => {
        if(!user) {
            bcrypt.hash('adminpassword', 12).then(hashedPwd => {
                const fakeAdmin = new User({
                    mail: fakeAdminMail,
                    password: hashedPwd
                });
                fakeAdmin.save();
            });
        }
    })
    .catch(err => {
        console.log('an error occursed', err);
    });

module.exports = app;