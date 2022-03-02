const Author = require('../models/authors.model');

exports.getAuthorViews = async (req, res, next) =>
  Author.find({})
    .then(authors => {
      res.render('addauthor', { authors: authors });
    })
    .catch(error => next(error));

exports.addAuthor = async (req, res, next) =>
  Author.create({
    author: req.body.author,
  })
    .then(() => {
      req.flash('success', 'Authors Added');
      res.location('/');
      res.redirect('/authors/add');
    })
    .catch(e => next(e));
