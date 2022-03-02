const Categories = require('../models/categories.model');
const Author = require('../models/authors.model');
const Posts = require('../models/posts.model');
const Comment = require('../models/comments.model');

exports.getForm = async (req, res, next) => {
  try {
    const promises = [];
    promises.push(Author.find().lean());
    promises.push(Categories.find().lean());
    const [authors, categories] = await Promise.all(promises);
    res.render('addpost', {
      authors: authors,
      categories: categories,
    });
  } catch (error) {
    next(error);
  }
};

exports.addPost = async (req, res, next) =>
  Posts.create({
    ...req.body,
    mainimage: req.file.filename,
    date: new Date(),
  })
    .then(() => {
      req.flash('success', 'Post Added');
      res.location('/');
      res.redirect('/');
    })
    .catch(e => next(e));

exports.showPostId = async (req, res, next) => {
  try {
    const promises = [];
    promises.push(Posts.findById(req.params.id).lean());
    promises.push(Comment.find({ postid: req.params.id }).lean());
    const [post, comment] = await Promise.all(promises);
    res.render('singlepost', {
      post: post,
      comments: comment,
    });
  } catch (error) {
    next(error);
  }
};

exports.sortPostCategory = async (req, res, next) => {
  try {
    const promises = [];
    promises.push(Posts.find({ category: req.params.category }).lean());
    promises.push(Categories.find({}).lean());
    promises.push(Author.find({}).lean());
    const [posts, categories, authors] = await Promise.all(promises);
    res.render('index', {
      posts: posts,
      categories: categories,
      authors: authors,
    });
  } catch (error) {
    next(error);
  }
};

exports.addComment = async (req, res, next) => {
  const postid = req.body.postid;

  try {
    await Comment.create({
      ...req.body,
      commentDate: new Date(),
    });
    req.flash('success', 'Comment Added');
    res.redirect('/posts/show/' + postid);
  } catch (error) {
    next(error);
  }
};
