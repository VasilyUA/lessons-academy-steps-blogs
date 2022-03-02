let { Router } = require('express');
let router = Router();
// const multer = require("multer");
// const upload = multer({ dest: "./public/uploads/" });
const validation = require('../validation/posts');
const controllers = require('../controllers/posts');

router.get('/add', controllers.getForm);

router.post('/add', validation.addPost, controllers.addPost);

router.get('/show/:id', controllers.showPostId);

router.get('/sort/:category', controllers.sortPostCategory);

router.post('/addcomment', validation.addComment, controllers.addComment);

module.exports = router;
