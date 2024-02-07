const express = require("express");
const axios = require("axios");

//************** GET WEATHER DATA **************//
const getWeather = async (req, res) => {
  try {
    // const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
    // const apiKey = "0514cec15af37e9bf5c61bcb38630e34";

    const weatherAPI = process.env.WEATHER_API;
    const apiKey = process.env.WEATHER_API_KEY;

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "OpenWeatherMap API key is missing" });
    }

    const response = await axios.get(
      `${weatherAPI}?q=Islamabad&appid=${apiKey}`
    );

    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      clouds: response.data.clouds.all,
      pressure: response.data.main.pressure,
      city: response.data.name,
      weather: response.data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//************** GET WEATHER DATA BASED ON CITY NAME **************//
const getCityWeather = async (req, res) => {
  try {
    // const weatherAPI = "https://api.openweathermap.org/data/2.5/weather";
    // const apiKey = "0514cec15af37e9bf5c61bcb38630e34";

    const weatherAPI = process.env.WEATHER_API;
    const apiKey = process.env.WEATHER_API_KEY;

    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City parameter is required" });
    }

    if (!apiKey) {
      return res
        .status(500)
        .json({ error: "OpenWeatherMap API key is missing" });
    }

    const response = await axios.get(`${weatherAPI}?q=${city}&appid=${apiKey}`);

    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      clouds: response.data.clouds.all,
      pressure: response.data.main.pressure,
      city: response.data.name,
      weather: response.data.weather[0].description,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getWeather, getCityWeather };
