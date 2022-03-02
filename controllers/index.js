const Posts = require("../models/posts.model");
const Authors = require("../models/authors.model");
const Categories = require("../models/categories.model");

exports.indexPage = async (req, res, next) => {
  try {
    const promises = [];
    promises.push(Posts.find().sort({ date: -1 }).lean());
    promises.push(Categories.find().lean());
    promises.push(Authors.find().lean());
    const [posts, categories, authors] = await Promise.all(promises);
    res.render("index", {
      posts: posts,
      categories: categories,
      authors: authors,
    });
  } catch (err) {
    next(err);
  }
};
