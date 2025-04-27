const express = require('express');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
let multer = require('multer')
let upload = multer()

const errorHandler = require('./middleware/handlers')
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');
const ordersRouter = require('./routes/orders');
const orderlinesRouter = require('./routes/orderlines')

const app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.none())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/customers', usersRouter);
app.use('/api/authors',authorsRouter)
app.use('/api/books', booksRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/orderlines',orderlinesRouter)

// the route is not found
app.use(errorHandler.notFound)

// error handler
app.use(errorHandler.errorResponse)

module.exports = app;
