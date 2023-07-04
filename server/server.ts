import express from "express";
import path from "path";
import "dotenv/config";
import axios from "axios";

const app = express();

const apiKey = process.env.OPENWEATHER_API_KEY;
const LAT = process.env.LAT || 42.867;
const LON = process.env.LON || -88.333;
const apiUrl = "https://api.openweathermap.org/data/3.0/onecall";

async function getWeatherData() {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        appid: apiKey,
        lat: LAT,
        lon: LON,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

app.get("/api/weather", async (req, res) => {
  const weatherData = await getWeatherData();
  res.json(weatherData);
});

app.use(express.static("../client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log("Server started on port ", PORT);
});
