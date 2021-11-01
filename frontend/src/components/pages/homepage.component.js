import React, { Component } from "react";
import Garage from "./garage.component";
import "./homepage.css";
import * as d3 from "d3";

/**
 * Main Component to display an overview of all parking garages in aarhus
 */

const API_URL_OPENDATA_PARKING_GARAGES =
  "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=2a82a145-0195-4081-a13c-b0e587e9b89c";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      garages: [],
      array1: [25, 50, 35, 15, 94, 10, 40],
      array2: [45, 60, 15, 45, 74, 5, 30],
      array3: [34, 64, 20, 10, 10, 35, 60],
    };
  }

  componentDidMount() {
    fetch(API_URL_OPENDATA_PARKING_GARAGES)
      .then((response) => response.json())
      .then((data) => this.setState({ garages: data.result.records }))
      .catch(console.error());

    this.drawLineChart();
  }

  drawLineChart() {
    // setting up svg
    const w = 600;
    const h = 300;
    const svg = d3
      .select(this.myRef.current)
      .attr("width", w)
      .attr("height", h)
      .style("background", "#d3d3d3")
      .style("margin-left", "100")
      .style("margin-bottom", "30")
      .style("overflow", "visible");

    // setting the scaling

    const xScale = d3
      .scaleLinear()
      .domain([0, this.state.array1.length - 1])
      .range([0, w]);

    const yScale = d3.scaleLinear().domain([0, h]).range([h, 0]);

    const generatedScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    const generatedScaledLine1 = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);
    // setting axes
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(this.state.array1.length)
      .tickFormat((i) => i + 1);

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);
    //setting up the data
    svg
      .selectAll(".line")
      .data([this.state.array1])
      .join("path")
      .attr("d", (d) => generatedScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "blue");

    svg
      .selectAll(".line")
      .data([this.state.array2])
      .join("path")
      .attr("d", (d) => generatedScaledLine1(d))
      .attr("fill", "none")
      .attr("stroke", "red");

    svg
      .selectAll(".line")
      .data([this.state.array3])
      .join("path")
      .attr("d", (d) => generatedScaledLine1(d))
      .attr("fill", "none")
      .attr("stroke", "orange");
  }

  garageList() {
    return this.state.garages.map((garage) => {
      return (
        <Garage
          garageCode={garage.garageCode}
          totalSpaces={garage.totalSpaces}
          vehicleCount={garage.vehicleCount}
        />
      );
    });
  }

  /** render component */
  render() {
    return (
      <div class="container">
        <header class="jumbotron my-4">
          <h3 class="display-3">Parking Aarhus</h3>
        </header>
        <body>
          <table>
            <thead>
              <th>Garage </th>
              <th>Capacity </th>
            </thead>
            {this.garageList()}
          </table>
        </body>
        <svg ref={this.myRef}></svg>
      </div>
    );
  }
}
