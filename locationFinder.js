const fs = require("fs");
const rangeCalculator = require("./helperFunctions/rangeCalculator");

//import all .json files into data
const data = {};
const dir = "./data/formattedData/";
fs.readdirSync(dir).forEach(function (file) {
  data[file.replace(/\.json$/, "")] = require(dir + file);
});
//this console.log lists all the .json files that are imported
//access a specific .json by specifying a property of data
//e.g. data.circus
console.log(Object.keys(data));

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

//function that takes the rangebox array and the datapoints of a single category and adds a datapoint into the object if it falls inside of the rangebox
function dataPointInserter(allRanges, categoryData) {
  console.log("hi");
}

//the main function that this app depends on. It would have to be called by the server and its arguments should be each category that was chosen
function locationFinder(...categories) {
  //   console.log(categories);
  //sort the categories by amount of datapoints
  //it should only use the minimum amount of data points for speed and efficiency
  //so the smallest category should be taken first since there won't be a succesful result if
  //that isn't included
  const orderedCategories = [...categories].sort((a, b) => {
    return data[a].length - data[b].length;
  });
  console.log(orderedCategories);

  //array of all range in which to search for datapoints
  const rangeBoxArr = rangeBoxer(orderedCategories[0]);

  dataPointInserter(rangeBoxArr, "bingo");

  //for the next category, check whether there is any datapoint within any range from the last category
  //if a datapoint is inside, add it to the object and save it for the next round
  //if a datapoint is NOT inside any range, leave it out
  //any range that did not receive a new datapoint in this round will also be left out

  //repeat the previous block until all categories have been checked
}

console.log(locationFinder("cinema", "bar", "circus"));
