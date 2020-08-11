const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const geoData = require('./data/geo.js');

app.use(cors());

app.use(express.static('public'));

// placeholder for future munging
function getLatLong(cityName) {

    const city = geoData[0];
    
    return {
        formatted_query: city.display_name,
        latitude: city.lat,
        longitude: city.lon
    };

}

app.get('/location', (req, res) => {
  const userInput = req.query.search;

    const mungedData = getLatLong(userInput);
    res.json(mungedData);
        
    // formatted_query: 'Seattle, WA, USA',
    // latitude: "47.606210",
    // longitude: "-122.332071"
    
})
app.get('')


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


