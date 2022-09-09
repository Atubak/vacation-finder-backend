//requires
const { Router } = require("express");
const locationFinder = require("../locationFinder");
const fs = require("fs");

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

//build endpoint that takes all available category files and returns their names
router.get("/categories", (req, res, next) => {
  try {
    res.json(allCategories);
  } catch (e) {
    next(e.message);
  }
});

//make a post endpoint that recieves an array of categories in the body and returns the ranges that fulfill all the criteria
router.post("/", (req, res, next) => {
  //have to split the next line because httpie only accepts one string in the body
  //when sending httpie post req, make sure to separate each cat with a comma
  //will fix this when working on frontend
  console.log(req.body.categories);
  const categories = req.body.categories;

  try {
    const allLocations = locationFinder(...categories);

    //if the result of locationFinder is a string that means there is no valid location with all categories
    if (typeof allLocations === "string") return res.json(allLocations);

    //if the results are many, take only 10 random results and send it back
    if (allLocations.length > 10) {
      let randomLocationsArr = [];
      let choices = [];
      for (let i = 0; i < 10; i++) {
        let newChoiceMade = false;
        while (!newChoiceMade) {
          const randomLocationIndex = Math.floor(
            Math.random() * allLocations.length
          );
          if (!choices.includes(randomLocationIndex)) {
            newChoiceMade = true;
            choices.push(randomLocationIndex);
          }
        }
      }
      randomLocationsArr = choices.map((choice) => allLocations[choice]);

      return res.json(randomLocationsArr);
    }

    res.json(allLocations);
  } catch (e) {
    next(e.message);
  }
});

module.exports = router;
