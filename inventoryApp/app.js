var createError = require('http-errors');
var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//use assets folder
const assetPath = path.join(__dirname, 'public');
app.use(express.static(assetPath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));