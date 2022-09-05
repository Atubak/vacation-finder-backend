const userModel = require("./models").user;
const locationModel = require("./models").location;

async function userAndLocation() {
  const user = await userModel.findByPk(1, {
    include: { model: locationModel },
  });

  console.log(user.toJSON());
}

userAndLocation();
