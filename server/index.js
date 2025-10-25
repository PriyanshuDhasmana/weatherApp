// server/index.js
const axios = require("axios");

module.exports = async function handler(req, res) {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City name required" });

  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};
