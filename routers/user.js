const { Router } = require("express");
const authMiddleWare = require("../auth/middleware");
const userModel = require("../models").user;
const userFollowingUserModel = require("../models").userFollowingUser;

const router = Router();

//a router that inserts the picture url from cloudinary
router.patch("/pic", authMiddleWare, async (req, res, next) => {
  const { user } = req;
  const { imgUrl } = req.body;

  try {
    const addImg = await userModel.update(
      { imgUrl },
      { where: { id: user.id } }
    );
    if (addImg) return res.send("success");
    res.send("something went wrong adding a picture");
  } catch (e) {
    next(e);
  }
});

//endpoint to add a description
router.patch("/descr", authMiddleWare, async (req, res, next) => {
  const { user } = req;
  const { description } = req.body;
  try {
    const addDescr = await userModel.update(
      { description },
      { where: { id: user.id } }
    );

    if (addDescr) return res.send("success");
    res.send("something went wrong adding a description");
  } catch (e) {
    next(e);
  }
});

//endpoint that gives a user object to be displayed
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await userModel.findByPk(id, {
      include: { all: true, nested: true },
    });
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//toggle user-user relations
router.patch(`/add`, authMiddleWare, async (req, res, next) => {
  const { addedUser } = req.body;
  const { user } = req;
  try {
    //if the user already follows this user, stop following them
    if (!user.followedUser.every((el) => el.id !== addedUser)) {
      await userFollowingUserModel.destroy({
        where: { follower: user.id, followee: addedUser },
      });

      const newUserPage = await userModel.findByPk(addedUser, {
        include: { all: true, nested: true },
      });

      const newProfile = await userModel.findByPk(user.id, {
        include: { all: true, nested: true },
      });

      return res.json({ msg: "deleted", newUserPage, newProfile });
    }

    await userFollowingUserModel.create({
      followee: addedUser,
      follower: user.id,
    });

    //need both the new userpage and the profile object since we need to compare them on the client side
    const newUserPage = await userModel.findByPk(addedUser, {
      include: { all: true, nested: true },
    });

    const newProfile = await userModel.findByPk(user.id, {
      include: { all: true, nested: true },
    });

    res.json({ msg: "added", newUserPage, newProfile });
  } catch (e) {
    next(e.message);
  }
});

module.exports = router;
