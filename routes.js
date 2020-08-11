// require('dotenv').config();
// const request superagent
const express = require('express');
const cors = require('cors');
const request = require('express');
const app = express();

const weatherData = require('./data/weather.js');

const geoData = require('./data/geo.js');
const { response } = require('express');



// TO DO: 
// 1. replace hard code with API data
// 2. add the GEOCODE_API_KEY to .env and pop it in the url
// 3. add the city name from the query params
// 4. go find the first city in the response
// 5. change its shape to fit the contract with the front end
// 6. now that getLatLon is asynchronous, we must AWAIT it

app.use(express.static('public'));

const { 
    GEOCODE_API_KEY,
    // WEATHER_BIT_KEY,
    // HIKING_PROJECT_KEY,
    // YELP_KEY
} = process.env;

async function getLatLong(cityName) {
    //TODO: we make an api call to get the GEOcity
    // https://us1.locationiq.com/v1/search.php?key=%7Bapi-key%7D&q=%7Bcity-name%7D&format=json
    const respone = await request.get(`https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${cityName}&format=json`);
    const city = response.body[0];
    
    return {
        formatted_query: city.display_name,
        latitude: city.lat,
        longitude: city.lon
    };
}


// munge function
function getWeather(lat, lon) {
    //TODO: we make an api call to get the weather
    const data = weatherData.data

    const forecastArray = data.map((weatherItem) => {
        return {
            forecast: weatherItem.weather.description,
            time: new Date(weatherItem.ts * 1000),
        };
    });
    return forecastArray;
}

// app.get('/chars', async (req, res) => {
//     try {
//         const response = await request.get('https:');

//         const pokemon = response.body.results;
//     } catch (e) {
//         res.status(418).json({ error: e.message })
//     }
// })

app.get('/location', (req, res) => {
    try {
        const userInput = req.query.search;

        const mungedData = await getLatLong(userInput);

        res.json(mungedData);
    } catch (e) {
        res.status(418).json({ error: e.message });
    }
})

// need to implement the await function below once WEATHER_API placed   
app.get('/weather', (req, res) => {
    try {
        const userLat = req.query.latitude;
        const userLon = req.query.longitude;

        const mungedData = getWeather(userLat, userLon);
        res.json(mungedData);
    } catch (e) {
        res.status(418).json({ error: e.message });
    }
})





