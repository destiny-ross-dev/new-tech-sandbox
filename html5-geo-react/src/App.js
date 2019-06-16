import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
class App extends Component {
  state = { lat: "", long: "", results: [] };

  componentDidMount() {
    this.setUpCoords();
  }
  setUpCoords = () => {
    let { navigator } = window;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState(
          {
            lat: position.coords.latitude,
            long: position.coords.longitude
          },
          () =>
            axios
              .get(`/request?lat=${this.state.lat}&long=${this.state.long}`)
              .then(res => {
                this.setState({ results: res.data.results });
              })
        );
      });
    }
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* {`${this.state.lat}, ${this.state.long}`} */}
          {this.state.results &&
            this.state.results.map((e, i) => {
              return <h1 key={i}>{e.name}</h1>;
            })}
        </header>
      </div>
    );
  }
}

export default App;

// `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.MAPS_KEY}&input=walmart&inputtype=textquery&locationbias=circle:32190`
