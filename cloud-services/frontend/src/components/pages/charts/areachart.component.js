import React, { Component } from "react";
import "../css/homepage.css";
import * as d3 from "d3";

export default class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: this.props.data,
    };
  }

  componentDidUpdate() {
    console.log("updating");
    this.draw();
  }

  componentDidMount() {
    this.draw();
  }

  /** draw area chart */
  draw() {
    // clear chart
    d3.select(this.myRef.current).selectChildren().remove();
    console.log(this.myRef.current);
    d3.select(this.myRef).remove();
    console.log("draw chart");
    console.log(this.props.data);
    console.log(this.state.data);
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 575 - margin.left - margin.right,
      height = 350 - margin.top - margin.bottom;

    var x = d3
      .scaleLinear()
      .domain([
        1,
        d3.max(this.props.data, function (d) {
          return d.x;
        }),
      ])
      .range([0, width]);

    var y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.props.data, function (d) {
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
      .datum(this.props.data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "blue")
      .on("mouseover", (d) =>{
        console.log("mousover: ", d)
      });

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g").attr("class", "y axis").call(yAxis);
  }

  /** render component */
  render() {
    return (
      <div>
        <h4 id="chartTitle">{this.props.title}</h4>
        <svg ref={this.myRef}></svg>
      </div>
    );
  }
}
