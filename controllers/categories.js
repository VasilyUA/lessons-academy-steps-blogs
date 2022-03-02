const Category = require('../models/categories.model');

exports.getView = (req, res, next) =>
  Category.find({})
    .then(categories => {
      res.render('addcategories', { categories: categories });
    })
    .catch(e => next(e));

exports.addCategory = (req, res, next) => {
  Category.create({
    category: req.body.category,
  })
    .then(() => {
      req.flash('success', 'Category Added');
      res.location('/');
      res.redirect('/categories/add');
    })
    .catch(e => next(e));
};
