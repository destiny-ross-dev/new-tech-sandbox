import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import pokeball from "./Pokeball.png";

class App extends Component {
  state = { pokedex: {}, starters: {} };
  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    let response = await axios.get("/pokedex");
    console.log(response.data);
    let startersArray = [];

    startersArray.push.apply(startersArray, [
      response.data.data.results[0],
      response.data.data.results[3],
      response.data.data.results[6]
    ]);
    console.log(startersArray);
    this.setState({ starters: startersArray });
  };

  render() {
    let { starters } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {starters.length > 0 &&
            starters.map((e, i) => (
              <div className="Pokemon" key={i}>
                <img className="pokeball" src={pokeball} />
                <h1>{e.name}</h1>
              </div>
            ))}
        </header>
      </div>
    );
  }
}

export default App;
