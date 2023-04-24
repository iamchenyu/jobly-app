const express = require("express");
const router = new express.Router();
const { getImages } = require("../helpers/api");

router.get("/images", async (req, res, next) => {
  try {
    const result = await getImages();
    return res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
