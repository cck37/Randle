var express = require("express");
var router = express.Router();

var { getCategory } = require("../helpers/handleCategory");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json(getCategory());
});

module.exports = router;
