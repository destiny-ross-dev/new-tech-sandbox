import React, { Component } from "react";
import * as d3 from "d3";
import _ from "lodash";
import "./App.css";

import BarChart from "./components/BarChart";
import WorldMap from "./components/WorldMap";
import AreaChart from "./components/AreaChart";
import Histogram from "./components/Histogram";

const startYear = 2008;
const numYears = 10;

const holidays = _.chain(numYears)
  .times(i => {
    return [
      [new Date(`6/1/${startYear + i}`), new Date(`8/30/${startYear + i}`)],
      [new Date(`11/1/${startYear + i}`), new Date(`12/31/${startYear + i}`)]
    ];
  })
  .flatten()
  .value();
class App extends Component {
  state = {
    movies: [],
    filtered: [],
    filters: {},
    colors: d3.scaleSequential(d3.interpolateViridis),
    holidays
  };
  componentDidMount() {
    fetch(`movies.json`)
      .then(resp => resp.json())
      .then(movies => {
        movies = _.chain(movies)
          .map(d => Object.assign(d, { date: new Date(d.date) }))
          .filter(d => d.boxOffice && d.year >= startYear)
          .value();

        const colorDomain = d3.extent(movies, d => d.score);
        this.state.colors.domain(colorDomain).nice();

        this.setState({ movies, filtered: movies });
      });
  }
  updateFilters = filter => {
    const filters = Object.assign(this.state.filters, filter);
    const filtered = _.filter(this.state.movies, d =>
      _.every(
        filters,
        (bounds, key) => !bounds || (bounds[0] < d[key] && d[key] < bounds[1])
      )
    );

    this.setState({ filters, filtered });
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>D3 Dash</h2>
        </div>
        <div className="Charts">
          <BarChart
            data={[1, 3, 3, 7, 10, 9, 11, 15, 13, 14]}
            size={[200, 300]}
          />
          <WorldMap />
        </div>
        <div style={{ width: 1000, margin: "auto" }}>
          <h1>The Seasonality of Box Office Hits</h1>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "65px" }}>
              <strong>$ Over/Under Median Box Office</strong>
            </div>
            <AreaChart {...this.state} />
          </div>

          <div style={{ display: "inline-block" }}>
            <Histogram
              {...this.state}
              attr="score"
              updateFilters={this.updateFilters}
            />
            <div>
              <strong>Metascores</strong>
            </div>
          </div>

          <div style={{ display: "inline-block" }}>
            <Histogram
              {...this.state}
              attr="boxOffice"
              format={d => `$${parseInt(d / 1000000)}M`}
              updateFilters={this.updateFilters}
            />
            <div>
              <strong>Box Office Figures</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
