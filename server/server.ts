import express from "express";
import "dotenv/config";
import axios from "axios";

const app = express();

const apiKey = process.env.OPENWEATHER_API_KEY;
const apiUrl = "https://api.openweathermap.org/data/3.0/onecall";

async function getWeatherData() {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        appid: apiKey,
        lat: 42.867,
        lon: -88.333,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

app.get("/api/weather", async (req, res) => {
  const weatherData = await getWeatherData();
  const mockData = {
    temp: 80,
    hi: 82,
    low: 68,
  };
  res.json(weatherData);
});

app.listen(5001, () => {
  console.log("Server started on port 5001");
});
