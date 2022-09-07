// import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
const LatLon = require("geodesy").LatLonEllipsoidal;

//for each data point of the smallest category, take a coordinate that is 2.5km to the north and east
//take another one to the south and west and you have a 5x5km area

//more distance values for testing purposes
//10x10km: distance = 7071m
//50x50km: distance = 35355m
//100x100km: distance = 70710m
//250x250km: distance = 353553m, around the size of ireland
//distance = 3024498m, size of usa

function rangeCalculator(lat, long) {
  //save the range in an an object
  const range = {};
  //north east and south west to get the corners of the range
  const bearing = [45, -135];
  // 5x5km: distance in meters, 2500^2 + 2500^2 = 12500, √12500 = 3535.53m line to each bearing
  const distance = 3535;
  //initial point
  const point1 = new LatLon(lat, long);

  //for each bearing, take a coordinate that represents the range's north east and south west
  bearing.forEach((brng, index) => {
    const point2 = point1.destinationPoint(distance, brng);

    //delete the datum prop that comes with LatLon object since I don't need it
    delete point2.datum;

    range[`coordinate${index + 1}`] = point2;
  });

  return range;
}

module.exports = rangeCalculator;
