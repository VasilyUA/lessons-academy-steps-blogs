exports.addAuthor = async (req, res, next) => {
  req.checkBody('author', 'Author field is required').notEmpty();

  const errors = req.validationErrors();
  const params = { errors };

  if (errors) res.render('addauthor', params);
  else next();
};
