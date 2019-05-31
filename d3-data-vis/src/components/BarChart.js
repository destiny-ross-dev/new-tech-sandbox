import React, { Component } from "react";
import { scaleLinear } from "d3-scale";
import { max } from "d3-array";
import { select } from "d3-selection";
import "../App.css";

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.createBarChart = this.createBarChart.bind(this);
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart() {
    const node = this.node;
    const dataMax = max(this.props.data);
    const yScale = scaleLinear()
      .domain([0, dataMax])
      .range([0, this.props.size[1]]);
    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .enter()
      .append("rect");

    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .exit()
      .remove();

    select(node)
      .selectAll("rect")
      .data(this.props.data)
      .style("fill", "#fe9922")
      .attr("x", (d, i) => i * 50)
      .attr("y", d => this.props.size[1] - yScale(d))
      .attr("height", d => yScale(d))
      .attr("width", 40);
  }
  render() {
    return <div>
      <h2>Some Random Bar Chart</h2>
      <svg className="barChart" ref={node => (this.node = node)} width={500} height={500} />
      </div>
  }
}
export default BarChart;
