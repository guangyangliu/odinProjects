const express = require('express');
const app = express();
const path = require('path');
const indexRouter = require('./routes/index');

const session = require('express-session');
const passport = require('passport');
const PgStore = require('connect-pg-simple')(session);


require('dotenv').config();
require('./model/populateModel');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session setup
const sessionStore = new PgStore({
    conString: process.env.DATABASE_URL,
    tableName: 'sessions',
    createTableIfMissing: true
});


app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000*60*60*24 //1 day
    }
}));

//passport setup
require('./passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});