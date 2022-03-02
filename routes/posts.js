const { Router } = require('express');
const router = Router();
const upload = require('../services/multer');
const validation = require('../validation/posts');
const controllers = require('../controllers/posts');

router.get('/add', controllers.getForm);

router.post('/add', upload.single('mainimage'), validation.addPost, controllers.addPost);

router.get('/show/:id', controllers.showPostId);

router.get('/sort/:category', controllers.sortPostCategory);

router.post('/addcomment', validation.addComment, controllers.addComment);

module.exports = router;
