//requires
const { Router } = require("express");
const locationFinder = require("../locationFinder");

//db models

//initialise router
const router = Router();

//make a get endpoint that gives an example search with circuses and beaches
router.get("/example", (req, res, next) => {
  try {
    res.json(locationFinder("circus", "beach"));
  } catch (e) {
    next(e.message);
  }
});

//make a post endpoint that

module.exports = router;
