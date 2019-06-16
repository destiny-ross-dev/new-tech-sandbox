const axios = require("axios");

const getRequest = async (req, res) => {
  let { lat, long } = req.body;
  try {
    let listings = await axios.get(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${
        process.env.REACT_APP_MAPS_KEY
      }&input=walmart&inputtype=textquery&locationbias=circle:32190@${lat},${long}`
    );
    console.log(listings);
    res.status(200).send(listings);
  } catch (err) {
    console.log(err);
    res.status(500).send({ error: "Problem retrieving listings." });
  }
};

module.exports = { getRequest };
