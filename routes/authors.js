const { Router } = require('express');
const router = Router();
const controllers = require('../controllers/authors');
const validation = require('../validation/authors');

/* GET home page. */
router.get('/add', controllers.getAuthorViews);

router.post('/add', validation.addAuthor, controllers.addAuthor);

module.exports = router;
