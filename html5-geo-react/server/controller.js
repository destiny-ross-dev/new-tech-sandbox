const axios = require("axios");

const getRequest = async (req, res) => {
  // console.log("hit");
  console.log(req.query);
  let { lat, long } = req.query;
  try {
    let listings = await axios.get(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${
        process.env.REACT_APP_MAPS_KEY
      }&location=${lat},${long}&rankby=distance&keyword=walmart`
    );
    console.log(listings.data);
    res.status(200).json(listings.data);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Problem retrieving listings." });
  }
};

module.exports = { getRequest };
