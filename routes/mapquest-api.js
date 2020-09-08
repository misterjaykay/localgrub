const axios = require("axios");
require('dotenv').config();

module.exports = function(app) {
  app.get("/api/search/", (req, res) => {
    console.log('req',req.query);

    const apiKey = "jUrjn4JAxCERevOOxkUv1jObVfgDsRJ6";
    const queryURL = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${req.query.city},${req.query.state}`;

    // axios.get(`https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${req.query.city},${req.query.state}`)
    axios.get(
      "https://www.mapquestapi.com/geocoding/v1/address", {
      params: {
        key: process.env.MQ_KEY,
        city: req.query.city,
        state: req.query.state
      }
    })
      .then(function(response) {
        // console.log('data', response.data.results);
        // console.log('status',response.status);
        // console.log('text',response.statusText);
        res.json(response.data.results);
      })
      .catch((err) => {
        res.status(404).json(err);
        console.log('error message:\n',err);
      });
  });
};
