var express = require("express");
var router = express.Router();

var { getGuessResponse } = require("../helpers/handleCategory");

/* GET guess response. */
router.get("/", function (req, res, next) {
  if (!Object.hasOwn(req.query, "guess")) {
    res.status(400).json({ err: "Must provide a guess" });
    return;
  }

  const guessRepsonse = getGuessResponse(req.query.guess);
  if (guessRepsonse) res.json(guessRepsonse);
  else
    res.status(400).json({
      err: `Guess: ${req.query.guess} doesn't not exist in this category`,
    });
});

module.exports = router;
