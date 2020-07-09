const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//require('dotenv').config()

const errorHandler = require('./middleware/handlers')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const orderlinesRouter = require('./routes/orderlines')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/authors',authorsRouter)
app.use('/books', booksRouter);
app.use('/orders',ordersRouter);
app.use('/orderlines',orderlinesRouter)

// the route is not found
app.use(errorHandler.notFound)

// error handler
app.use(errorHandler.errorResponse)

module.exports = app;
