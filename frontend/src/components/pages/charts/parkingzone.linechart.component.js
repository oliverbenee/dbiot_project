import React, { Component } from "react";
import "../homepage.css";
import * as d3 from "d3";

export default class ParkingZoneLineChart extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      pKALKVAERKSVEJ: this.props.KALKVAERKSVEJ,
      pNewBusgadehuset: this.props.NewBusgadehuset,
      pSALLING: this.props.Salling,
    };
  }
  componentDidUpdate() {
    // if data changed redraw chart
    this.drawLineChart();
  }

  componentDidMount() {
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
    const xScale = d3.scaleLinear().domain([0, 6]).range([0, w]);

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
      .ticks(7)
      .tickFormat((i) => i + 1);

    const yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g").call(xAxis).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis);
    //setting up the data
    svg
      .selectAll(".line")
      .data([this.props.KALKVAERKSVEJ])
      .join("path")
      .attr("d", (d) => generatedScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "blue");

    svg
      .selectAll(".line")
      .data([this.props.NewBusgadehuset])
      .join("path")
      .attr("d", (d) => generatedScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "red");

    svg
      .selectAll(".line")
      .data([this.props.Salling])
      .join("path")
      .attr("d", (d) => generatedScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "green");
  }

  /** render component */
  render() {
    return <svg ref={this.myRef}></svg>;
  }
}
