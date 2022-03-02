exports.addCategory = (req, res, next) => {
  req.checkBody('category', 'Category field is required').notEmpty();

  const errors = req.validationErrors();
  const params = { errors };
  if (errors) res.render('addcategories', params);
  else next();
};
