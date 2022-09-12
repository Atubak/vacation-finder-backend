const userModel = require("./models").user;
const locationModel = require("./models").location;

async function userAndLocation() {
  const user = await userModel.findByPk(1, {
    include: "followingUser",
  });

  console.log(JSON.stringify(user, null, 2));
}

userAndLocation();

const locationFinder = require("./locationFinder");

// console.log(locationFinder("circus", "beach"));
