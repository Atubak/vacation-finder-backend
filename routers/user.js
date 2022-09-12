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
  } catch (e) {
    next(e);
  }
});

module.exports = router;
