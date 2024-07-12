const express = require("express");
const axios = require("axios");
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5001;


app.use(cors());

app.get("/api/users", (req, res) => {
  res.send([
    {
      name: "Alexander",
      age: 34,
    },
    {
      name: "TongTong",
      age: 23,
    },
  ]);
});


app.get("/api/weather/current/:location", async (req, res) => {
  const results = await getCurrentWeather(req.params.location);
  console.log("getCurrentWeather results", results);
  res.json(results);
});

app.get("/api/weather/forecast/:location", async (req, res) => {
  const results = await getForecast(req.params.location);
  console.log("getForecast results", results);
  res.json(results);
});

app.get("/api/location/search/:location", async (req, res) => {
  const results = await getLocationSearch(req.params.location);
  console.log("getLocationSearch results", results);
  res.json(results);
});


app.get("/", (req, res) => {
  const apiDetails = "http://localhost:5001/api/users";
  res.send({
    description: "server is running, go to apiDetails to see api",
    apiDetails,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});

const apiKey = "975dfecd1bff4fcc80314547241007";
const searchQuery = "08527";
const searchText = "Jackson";

async function getCurrentWeather(location) {
  console.log('location info',location);
  const results = await axios.get(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q="${location}"`
  );

  console.log("*******axios results", results.data.location);
  return { location: results.data.location, weather: results.data.current };
}

async function getForecast(location) {
  const results = await axios.get(

`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=4&aqi=no&alerts=no`
  );

  console.log("*axios forecast results", results.data);
  return { data: results.data };
}

async function getLocationSearch(location) {
  const results = await axios.get(
    `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${location}`
  );

  console.log("*******axios results", results.data);
  return { data: results.data };
}
