const express = require("express");
const {
  getWeather,
  getCityWeather,
} = require("../controllers/weatherController");

const router = express.Router();

router.get("/", getWeather);
router.post("/", getCityWeather);

module.exports = router;
