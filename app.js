const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//require('dotenv').config()

const errorHandler = require('./middleware/handlers')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');
const app = express();

const db = require('./dbs')
db.establishConnection()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// the route is not found
app.use(errorHandler.notFound)

// error handler
app.use(errorHandler.errorResponse)

module.exports = app;
