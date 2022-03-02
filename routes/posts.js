let express = require("express");
let router = express.Router();
// const multer = require("multer");
// const upload = multer({ dest: "./public/uploads/" });
const mongoose = require("mongoose");
const validation = require("../validation/posts");
const controllers = require("../controllers/posts");

router.get("/add", controllers.getForm);

router.post("/add", validation.addPost, controllers.addPost);

router.get("/show/:id", controllers.showPostId);

router.get("/sort/:category", controllers.sortPostCategory);

router.post("/addcomment", controllers.addComment);

module.exports = router;
