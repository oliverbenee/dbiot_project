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
    this.drawLineChart();
  }

  componentDidMount() {
    this.drawLineChart();
  }

  /** draw area chart */
  draw() {







  }

  /** render component */
  render() {
    return <svg id="vis1" ref={this.myRef}></svg>;
  }
}
