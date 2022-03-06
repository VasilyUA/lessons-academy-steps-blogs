const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const expressValidator = require('express-validator');
const path = require('path');
const bodyParser = require('body-parser');
const mongooes = require('mongoose');
const connectFlash = require('connect-flash');
const expressMessages = require('express-messages');

mongooes
  .connect(process.env.DB_URL)
  .then(() => console.log('Connected...')) // eslint-disable-line
  .catch(e => console.log(e)); // eslint-disable-line

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(connectFlash());

app.use((req, res, next) => {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.locals.moment = require('moment');
app.locals.blogPreview = function (text, length) {
  return text.substring(0, length);
};

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
  }),
);

app.use(
  expressValidator({
    errorFormatter: require('./validation/index'),
  }),
);

app.use('/', require('./routes/index'));
app.use('/posts', require('./routes/posts'));
app.use('/categories', require('./routes/categories'));
app.use('/authors', require('./routes/authors'));

app.use((req, res) => res.render('error', { message: `Not found!`, error: { status: 404 } }));

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
