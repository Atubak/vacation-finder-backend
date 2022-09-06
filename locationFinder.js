// import * as fs from "fs";
const fs = require("fs");
// import rangeCalculator from "./helperFunctions/rangeCalculator.js";
const rangeCalculator = require("./helperFunctions/rangeCalculator");
// import * as data from "./data/formattedData/index.js";
const data = {};
const dir = "./data/formattedData/";

fs.readdirSync(dir).forEach(function (file) {
  data[file.replace(/\.json$/, "")] = require(dir + file);
});

console.log(data.circus);

//cant use below code anymore bc of modules but might be useful later
//import all .json files

//the console.log lists all the .json files that are imported
//access a specific .json by specifying a property of data
//e.g. data.bar
// console.log(Object.keys(data));

//the function would have to be called by the server and its arguments should be each category that was chosen
function locationFinder(...categories) {
  //   console.log(categories);

  //sort the categories by amount of datapoints
  //it should only use the minimum amount of data points for speed and efficiency
  //so the smallest category should be taken first since there won't be a succesful result if
  //that isn't included
  const orderedCategories = [...categories].sort((a, b) => {
    return data[a].length - data[b].length;
  });

  console.log(rangeCalculator(45, 1));

  //for each data point of the smallest category, take a coordinate that is 2.5km to the north and east
  //take another one to the south and west and you have a 5x5km area
  //make an object for each range

  //for the next category, check whether there is any datapoint within any range from the last category
  //if a datapoint is inside, add it to the object and save it for the next round
  //if a datapoint is NOT inside any range, leave it out
  //any range that did not receive a new datapoint in this round will also be left out

  //repeat the previous block until all categories have been checked
}

console.log(locationFinder("cinema", "bar", "circus"));
