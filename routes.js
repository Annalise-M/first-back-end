require('dotenv').config();
// const request superagent
const express = require('express');
const cors = require('cors');
const app = express();

const weatherData = require('./data/weather.js');
const geoData = require('./data/geo.js');
const request = require('superagent');

// TO DO: 
// 1. replace hard code with API data
// 2. add the GEOCODE_API_KEY to .env and pop it in the url
// 3. add the city name from the query params
// 4. go find the first city in the response
// 5. change its shape to fit the contract with the front end
// 6. now that getLatLon is asynchronous, we must AWAIT it
app.use(cors());

app.use(express.static('public'));

const { 
    GEOCODE_API_KEY,
    WEATHER_BIT_KEY,
    HIKING_PROJECT_KEY
    // YELP_KEY
} = process.env;

async function getLatLong(cityName) {
    //TODO: we make an api call to get the GEOcity
    // https://us1.locationiq.com/v1/search.php?key=%7Bapi-key%7D&q=%7Bcity-name%7D&format=json
    const response = await request.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${cityName}&format=json`);


    const city = response.body[0];
    
    return {
        formatted_query: city.display_name,
        latitude: city.lat,
        longitude: city.lon
    };
}

app.get('/location', async(req, res) => {
    try {
        const userInput = req.query.search;

        const mungedData = await getLatLong(userInput);

        res.json(mungedData);
    } catch (e) {
        res.status(418).json({ error: e.message });
    }
});

// module.exports = {
//     app
// };
// WORK ON ONCE I GET ABOVE WORKING
// munge function

async function getWeather(lat, lon) {
    //TODO: we make an api call to get the weather
    const response = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?&lat=${lat}&lon=${lon}&key=${WEATHER_BIT_KEY}`);


    const forecastArray = response.body.data.map((weatherItem) => {
        return {
            forecast: weatherItem.weather.description,
            time: new Date(weatherItem.ts * 1000),
        };
    });
    
    return forecastArray;
}

//need to implement the await function below once WEATHER_API placed   
app.get('/weather', async (req, res) => {
    try {
        const userLat = req.query.latitude;
        const userLon = req.query.longitude;

        const mungedData = await getWeather(userLat, userLon);
        res.json(mungedData);
    } catch (e) {
        res.status(418).json({ error: e.message });
    }
})


async function getTrails(lat, lon) {
    //TODO: we make an api call to get the weather
    const response = await request.get(`https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=200&key=${HIKING_PROJECT_KEY}`);

console.log(lat, lon);
    const forecastArray = response.body.trails.map((trailsItem) => {
        return {
            name: trailsItem.trails.name,
            location: trailsItem.trails.longitude,
            
        };
    });
    
    return forecastArray;
}

//need to implement the await function below once WEATHER_API placed   
app.get('/trails', async (req, res) => {
    try {
        const userLat = req.query.latitude;
        const userLon = req.query.longitude;

        const mungedData = await getWeather(userLat, userLon);
        res.json(mungedData);
    } catch (e) {
        res.status(418).json({ error: e.message });
    }
})


module.exports = {
    app
};


