const { Router } = require('express');
const router = Router();
const validation = require('../validation/categories');
const controllers = require('../controllers/categories');

/* GET home page. */
router.get('/add', controllers.getView);

router.post('/add', validation.addCategory, controllers.addCategory);

module.exports = router;
