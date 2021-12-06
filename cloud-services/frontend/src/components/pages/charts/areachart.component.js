import React, { Component } from "react";
import "../css/homepage.css";
import * as d3 from "d3";
import "../css/chart.css";

export default class AreaChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      data: this.props.data,
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
    // clear chart
    d3.select(this.myRef.current).selectChildren().remove();
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

    var y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(5);

    var yAxis = d3.axisLeft(y);

    var area = d3
      .area()
      .x((datapoint) => x(datapoint.x))
      .y0(height)
      .y1((datapoint) => y(datapoint.y));

    var svg = d3
      .select(this.myRef.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .text("weekdays")
      .call(xAxis);

    svg.append("g").attr("class", "y axis").call(yAxis);

    // added label x axis
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + 27)
      .text("weekdays");

    svg
      .append("path")
      .datum(this.props.data)
      .attr("class", "area")
      .attr("d", area)
      .style("fill", "LightSteelBlue")
      .on("mouseover", (d, i) => {
        // Get bar's xy values, ,then augment for the tooltip
        var xPos = d.pageX;
        var yPos = d.pageY;

        // calculate index in array
        const xValue = x.invert(d.layerX);
        const realValue = d3.bisector((datapoint) => datapoint.x).center;
        const dataIndex = realValue(i, xValue, 1);
        const number = i[dataIndex - 1].y

        const percentage = Math.round((number + Number.EPSILON) * 100) / 100;

        // Update Tooltip's position and value
        d3.select("#tooltip")
          .style("left", xPos + "px")
          .style("top", yPos + "px")
          .select("#value")
          .text(percentage+"% occupied");

        d3.select("#tooltip").classed("hidden", false);
      })
      .on("mouseout", () => {
        d3.select("#tooltip").classed("hidden", true);
      });
  }

  /** render component */
  render() {
    return (
      <div id="chart-container">
        <div id="tooltip" className="hidden">
          <p>
          </p>
          <p>
            <span id="value">100</span>
          </p>
        </div>
        <h4 id="chartTitle">{this.props.title}</h4>
        <svg ref={this.myRef}></svg>
      </div>
    );
  }
}
