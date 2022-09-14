//requires
const { Router } = require("express");
const locationFinder = require("../locationFinder");
const fs = require("fs");
const authMiddleWare = require("../auth/middleware");

//models
const locationModel = require("../models").location;
const dataPointModel = require("../models").dataPoint;
const userModel = require("../models").user;
const userLocationModel = require("../models").userLocation;

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

    const resultsAmt = allLocations.length;

    //if the results are many, take only 10 random results and send it back
    if (resultsAmt > 5) {
      let randomLocationsArr = [];
      let choices = [];
      for (let i = 0; i < 1; i++) {
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

      return res.json({ randomLocationsArr, resultsAmt });
    }

    res.json({ randomLocationsArr: allLocations, resultsAmt });
  } catch (e) {
    next(e.message);
  }
});

//endpoint that takes a location and adds it to a user's favorites list
router.post("/favorites", authMiddleWare, async (req, res, next) => {
  const { dataPoints, info, id } = req.body.location;

  const { user } = req;
  console.log("locations id:", id);
  try {
    //if the user has no locations property, make one. happens when a fresh account  tries to add a favorite
    if (!user.locations) {
      user.locations = [];
    }
    //if the user already has the location in their favorites list, take it out the list
    if (!user.locations.every((loc) => loc.id !== id)) {
      await userLocationModel.destroy({ where: { userId: user.id } });

      const userWithLocs = await userModel.findByPk(user.id, {
        include: { model: locationModel, include: { model: dataPointModel } },
      });
      delete userWithLocs.dataValues["password"];
      return res.send({ userWithLocs, msg: "deleted" });
    }

    ////////////////////////
    //not dry but not sure how to manage it otherwise
    //if the location already is in the database, dont create a whole new location instance, just add the relation
    if (id) {
      //add the relation to the user
      await userLocationModel.create({
        userId: user.id,
        locationId: id,
      });

      //return the user instance with location id's included and the newly added location
      const userWithLocs = await userModel.findByPk(user.id, {
        include: { all: true, nested: true },
      });
      delete userWithLocs.dataValues["password"];

      const locWithDataPoints = await locationModel.findByPk(id, {
        include: { model: dataPointModel },
      });

      return res.json({ userWithLocs, locWithDataPoints, msg: "added" });
    }

    /////////////////////////////
    //make a new location instance
    const fav = await locationModel.create({
      info,
      lon: dataPoints[0].lon,
      lat: dataPoints[0].lat,
    });

    //add the relation to the user
    await userLocationModel.create({
      userId: user.id,
      locationId: fav.id,
    });

    //insert the datapoints into the db
    await dataPointModel.bulkCreate(
      dataPoints.map((dataP) => {
        return { ...dataP, locationId: fav.id };
      })
    );

    //return the user instance with location id's included and the newly added location
    const userWithLocs = await userModel.findByPk(user.id, {
      include: { all: true, nested: true },
    });
    delete userWithLocs.dataValues["password"];

    const locWithDataPoints = await locationModel.findByPk(fav.id, {
      include: { model: dataPointModel },
    });

    res.json({ userWithLocs, locWithDataPoints, msg: "added" });
  } catch (e) {
    next(e.message);
  }
});

///////////////////////////
//endpoint that retrieves all users that have favorited this particular location
router.get(`/:locationId/users`, async (req, res, next) => {
  const { locationId } = req.params;
  console.log(locationId);
  try {
    const allUsers = await userLocationModel.findAll({
      where: { locationId },
      include: { model: userModel },
    });
    // console.log(allUsers);
    res.json(allUsers);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
