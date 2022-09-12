const { Router } = require("express");
const authMiddleWare = require("../auth/middleware");
const userModel = require("../models").user;

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

module.exports = router;
