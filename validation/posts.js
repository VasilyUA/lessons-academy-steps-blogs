const Categories = require('../models/categories.model');
const Author = require('../models/authors.model');

exports.addPost = async (req, res, next) => {
  req.checkBody('title', 'Title field is required').notEmpty();
  req.checkBody('post', 'Body field is required').notEmpty();
  const errors = req.validationErrors();
  if (errors) {
    try {
      const promises = [];
      promises.push(Author.find().lean());
      promises.push(Categories.find().lean());
      const [authors, categories] = await Promise.all(promises);
      res.render('addpost', {
        errors,
        authors: authors,
        categories: categories,
      });
    } catch (err) {
      next(err);
    }
  } else next();
};

exports.addComment = async (req, res, next) => {
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('email', 'Email field is required').isEmail();
  req.checkBody('comment', 'Comment field is required').notEmpty();

  const errors = req.validationErrors();
  const params = { errors };
  if (errors) res.render('singlepage', params);
  else next();
};
