const express = require("express");
const router = express.Router();
const controllers = require("../controllers/index");

/* GET home page. */
router.get("/", controllers.indexPage);

module.exports = router;
