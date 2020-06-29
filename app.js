const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const errorHandler = require('./middleware/handlers')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const app = express();

require('dotenv').config()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// the route is not found
app.use(errorHandler.notFound)

// error handler
app.use(errorHandler.errorResponse)

module.exports = app;
