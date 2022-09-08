//requires
const { Router } = require("express");
const locationFinder = require("../locationFinder");

//reading filenames from datafolder
const allCategories = fs
  .readdirSync("./data/formattedData")
  .map((cat) => cat.replace(/\.json$/, ""));

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
  //have to split the next line because httpie only accepts one string in the body
  //when sending httpie post req, make sure to separate each cat with a comma
  //will fix this when working on frontend
  const categories = req.body.categories.split(",");

  try {
    res.json(locationFinder(...categories));
  } catch (e) {
    next(e.message);
  }
});

module.exports = router;
