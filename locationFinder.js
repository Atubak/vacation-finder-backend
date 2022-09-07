const fs = require("fs");
const rangeCalculator = require("./helperFunctions/rangeCalculator");

//import all .json files into data
const data = {};
const dir = "./data/formattedData/";
fs.readdirSync(dir).forEach(function (file) {
  data[file.replace(/\.json$/, "")] = require(dir + file);
});
//this console.log lists all the .json files that are imported with their length
//access a specific .json by specifying a property of data
//e.g. data.circus
// Object.keys(data).forEach((dat) => console.log(dat, data[dat].length));

//function that makes rangeBoxes to find datapoints in
function rangeBoxer(leastLengthCat) {
  //for the first category, make a range box within which to find the other categories
  //coordinate1 is the northeast point of the range
  //coordinate2 is the southwest point of the range
  //to have the complete range box, take the lat of c1 + lon of c2 AND lat of c2 + lon of c1
  //range box is hardcoded to 5x5km
  const rangeBoxes = data[`${leastLengthCat}`].map((dataPoint) => {
    return rangeCalculator(dataPoint.lat, dataPoint.lon);
  });

  return rangeBoxes;
}

//array of all ranges in which to search for datapoints
//TESTING WITH CIRCUS
const circusRangeBoxArr = rangeBoxer("circus");

//function that takes the rangebox array and the datapoints of a single category and adds a datapoint into the object if it falls inside of the rangebox
function dataPointInserter(allRanges, categoryDataName) {
  console.log(`now doing ${categoryDataName}...`);

  //thiscatdata is an array of all datapoints in one category
  const thisCatData = data[`${categoryDataName}`];

  //if a datapoint is inside, add it to the object and save it for the next round
  //if a datapoint is NOT inside any range, leave it out
  //any range that did not receive a new datapoint in this round will also be left out

  const newRangesArray = allRanges.filter((range, index) => {
    // console.log(`range being checked: ${index + 1}th`);
    //for each datapoint check if its inside the given range
    //if its inside, add it to the range.dataPoints prop
    // if its not, do nothing
    thisCatData.forEach((dataP) => {
      if (
        dataP.lat <= range.coordinate1.lat &&
        dataP.lon <= range.coordinate1.lon &&
        dataP.lat >= range.coordinate2.lat &&
        dataP.lon >= range.coordinate2.lon
      ) {
        //if range.dataPoints does not exist, make it and put in the dataP
        range.dataPoints
          ? (range.dataPoints = [...range.dataPoints, dataP])
          : (range.dataPoints = [dataP]);
      }
    });

    //take out the range if there hasn't been a datapoint added to it this round
    //if any range doesnt have the category data name in its range.dataPoints prop array, filter out the range
    return range.dataPoints?.some((datP) => datP.cat === categoryDataName);
  });

  console.log(`finish inserting ${categoryDataName}`);

  //when all ranges have been checked, return the new rangesArray
  // OR
  //if a category is a bottleneck that doesnt have any datapoint that goes into any range
  //take the name of that category and return it instead of the actual array

  return newRangesArray;
}

//the main function that this app depends on. It would have to be called by the server and its arguments should be each category that was chosen
function locationFinder(...categories) {
  console.log("categories selected:", categories);
  //sort the categories by amount of datapoints
  //it should only use the minimum amount of data points for speed and efficiency
  //so the smallest category should be taken first since there won't be a succesful result if
  //that isn't included
  const orderedCategories = [...categories].sort((a, b) => {
    return data[a].length - data[b].length;
  });
  // console.log("orderedCategories", orderedCategories);

  //array of all ranges in which to search for datapoints
  //uses the 0th element to use the rarest category
  const rangeBoxArr = rangeBoxer(orderedCategories[0]);

  //for each category, check whether there is any datapoint within any range
  //including the original category that was used to create the range in the first place
  //this way ranges will always have a datapoints array in the first iteration
  let rangesWithDataPoints = rangeBoxArr;

  orderedCategories.every((cat) => {
    rangesWithDataPoints = dataPointInserter(rangesWithDataPoints, cat);

    console.log(
      `rangesWithDataPoints length after ${cat}:`,
      rangesWithDataPoints.length
    );

    //if datapointinsert returns the category name, make rangesWithDataPoints a string and quit the loop
    if (rangesWithDataPoints.length === 0) {
      rangesWithDataPoints = `had to abort search because there are no areas of this size that have a ${cat}`;
      return false;
    }
    return true;
  });
  //repeat the previous block until all categories have been checked

  return rangesWithDataPoints;
}

module.exports = locationFinder;

// console.log(
//   locationFinder(
//     "hikingTrail",
//     "cinema",
//     "restaurant",
//     "museum",
//     "hotel",
//     "coffeeHouse"
//   )
// );

//FINISHED WITH THIS FUNCTION AND NOW I CAN ACTUALLY GIVE THE USER WHATEVER THEY WANT HEHEHE
