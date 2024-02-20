// defining the server port
const port = 3000;
// initializing installed dependencies
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const app = express();
const cors = require('cors');
app.use(cors());
// API request
app.get('/apod', (req, res) => {
   // Accessing the NASA API key from environment variables
   const NASA_API_KEY = process.env.VITE_SOME_KEY; 

    const options = {
        method: 'GET',
        url: `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`, // Passing the API key as a query parameter
    };

    axios.request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching APOD data' });
        });
});
app.get('/naturalImageAPI', (req, res) => {
    const NASA_API_KEY = process.env.VITE_SOME_KEY;

    const options = {
        method: 'GET',
        url: `https://api.nasa.gov/EPIC/api/natural?api_key=${NASA_API_KEY}`,
    };

    axios.request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching natural image data' });
        });
});

// API request for enhanced image
app.get('/enhancedImageAPI', (req, res) => {
    const NASA_API_KEY = process.env.VITE_SOME_KEY;

    const options = {
        method: 'GET',
        url: `https://api.nasa.gov/EPIC/api/enhanced?api_key=${NASA_API_KEY}`,
    };

    axios.request(options)
        .then(function (response) {
            res.json(response.data);
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while fetching enhanced image data' });
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
