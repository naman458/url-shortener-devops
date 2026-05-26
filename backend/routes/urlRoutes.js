const express = require("express");
const shortid = require("shortid");
const Url = require("../models/Url");

const router = express.Router();


// CREATE SHORT URL
router.post("/shorten", async (req, res) => {
  try {
    const { originalUrl } = req.body;

    const shortCode = shortid.generate();

    const newUrl = new Url({
      originalUrl,
      shortCode
    });

    await newUrl.save();

    res.json({
      shortUrl: `http://localhost:5000/${shortCode}`
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});


// GET ALL URL ANALYTICS
router.get("/analytics/all", async (req, res) => {
  try {
    const urls = await Url.find().sort({
      createdAt: -1
    });

    res.json(urls);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});


// REDIRECT SHORT URL
router.get("/:shortCode", async (req, res) => {
  try {
    const url = await Url.findOne({
      shortCode: req.params.shortCode
    });

    if (url) {

      url.clicks++;

      await url.save();

      return res.redirect(url.originalUrl);

    } else {

      return res.status(404).json({
        error: "URL not found"
      });

    }

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });
  }
});

module.exports = router;