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

//make a post endpoint that recieves an array of categories in the body
router.post("/", (req, res, next) => {
  const categories = req.body.categories;

  try {
    res.json(locationFinder(categories));
  } catch (e) {
    next(e.message);
  }
});

module.exports = router;
