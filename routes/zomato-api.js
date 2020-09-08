const axios = require("axios");
require("dotenv").config();

module.exports = function(app) {
  app.get("/api/zomato/search/", (req, res) => {
    console.log("req", req.query);

    axios
      .get("https://developers.zomato.com/api/v2.1/search", {
        headers: {
            user_key: process.env.ZMT_KEY
        },
        params: {
          lat: req.query.lat,
          lon: req.query.lon,
          sort: "real_distance"
        }
      })
      .then(function(results) {
        console.log("results is \n", results.data);
        res.json(results.data);
      })
      .catch((err) => {
        res.status(404).json(err);
        console.log("error message:\n", err);
      });
  });
};
