const Posts = require('../models/posts.model');
const Comment = require('../models/comments.model');
const Categories = require('../models/categories.model');
const Author = require('../models/authors.model');

exports.addPost = async (req, res, next) => {
  try {
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('post', 'Body field is required').notEmpty();
    const errors = req.validationErrors();

    const promises = [];
    promises.push(Author.find().lean());
    promises.push(Categories.find().lean());
    const [authors, categories] = await Promise.all(promises);

    const params = { errors, authors, categories };

    if (errors) return res.render('addpost', params);
    else next();
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').isEmail();
    req.checkBody('comment', 'Comment field is required').notEmpty();

    const errors = req.validationErrors();

    const promises = [];
    promises.push(Posts.findById(req.body.postid).lean());
    promises.push(Comment.find({ postid: req.body.postid }).lean());
    const [post, comment] = await Promise.all(promises);

    const params = { errors, post, comment };

    if (errors) res.render('singlepost', params);
    else next();
  } catch (error) {
    next(error);
  }
};
