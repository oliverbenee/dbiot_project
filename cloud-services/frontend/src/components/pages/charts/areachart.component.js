import React, { Component } from "react";
import "../css/homepage.css";
import * as d3 from "d3";

const data = [
  { x: 0, y: 10 },
  { x: 1, y: 15 },
  { x: 2, y: 35 },
  { x: 3, y: 20 },
  { x: 4, y: 20 },
  { x: 5, y: 20 },
  { x: 6, y: 20 },
];

export default class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: data,
    };
  }
  componentDidUpdate() {
    this.draw();
  }

  componentDidMount() {
    this.draw();
  }

  /** draw area chart */
  draw() {
    console.log(this.props.data);
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 575 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

    var x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.state.data, function (d) {
          return d.x;
        }),
      ])
      .range([0, width]);

    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.state.data, function (d) {
          return d.y;
        }),
      ])
      .range([height, 0]);

    var xAxis = d3.axisBottom(x);

    var yAxis = d3.axisLeft(y);

    var area = d3
      .area()
      .x(function (d) {
        console.log(d);
        return x(d.x);
      })
      .y0(height)
      .y1(function (d) {
        return y(d.y);
      });

    var svg = d3
      .select(this.myRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("path")
      .datum(this.state.data)
      .attr("class", "area")
      .attr("d", area);

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g").attr("class", "y axis").call(yAxis);
  }

  /** render component */
  render() {
    return <svg id="vis1" ref={this.myRef}></svg>;
  }
}
