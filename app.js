const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const expressValidator = require("express-validator");
// const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const createError = require("http-errors");
const path = require("path");
const bodyParser = require("body-parser");
const mongooes = require("mongoose");
const connectFlash = require("connect-flash");

mongooes
  .connect(process.env.DB_URL)
  .then(() => console.log("Connected..."))
  .catch((e) => console.log(e));

const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const categoriesRouter = require("./routes/categories");
const authorsRouter = require("./routes/authors");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.locals.moment = require("moment");
app.locals.blogPreview = function (text, length) {
  let preview = text.substring(0, length);
  return preview;
};

app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

app.use(
  expressValidator({
    errorFormatter: function (param, msg, value) {
      const namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;

      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value,
      };
    },
  })
);

app.use((req, res, next) => {
  req.mongooes = mongooes;
  next();
});

app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/categories", categoriesRouter);
app.use("/authors", authorsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
