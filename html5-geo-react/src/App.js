import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  useEffect(() => {
    let { navigator } = window;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      /* geolocation IS NOT available */
    }
  });
  useEffect(() => {
    axios
      .get("/", {
        lat,
        long
      })
      .then(res => console.log(res.data));
  });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {`${lat}, ${long}`}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

// `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.MAPS_KEY}&input=walmart&inputtype=textquery&locationbias=circle:32190`
