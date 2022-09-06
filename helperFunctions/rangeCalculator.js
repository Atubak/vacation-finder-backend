// import LatLon from "geodesy/latlon-ellipsoidal-vincenty.js";
const LatLon = require("geodesy").LatLonEllipsoidal;

//for each data point of the smallest category, take a coordinate that is 2.5km to the north and east
//take another one to the south and west and you have a 5x5km area

function rangeCalculator(lat, long) {
  //save the range in an an object
  const range = {};
  //north east and south west to get the corners of the range
  const bearing = [45, -135];
  //distance in meters, 2500^2 + 2500^2 = 12500, √12500 = 3535.53m line to each bearing
  const distance = 3535.53;
  //initial point
  const point1 = new LatLon(lat, long);

  //for each bearing, take a coordinate that represents the range's north east and south west
  bearing.forEach((brng, index) => {
    const point2 = point1.destinationPoint(distance, brng);

    //delete the extra datum prop
    delete point2.datum;

    range[`coordinate${index + 1}`] = point2;
  });

  return range;
}

module.exports = rangeCalculator;
