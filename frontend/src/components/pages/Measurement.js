import React, { Component } from "react";
import axios from "axios";

/**
 * Component to display the measurement
 */

export default class Measurement extends Component {
  constructor(props) {
    super(props);

    // use props to set state
    this.state = {
      time: this.props.time,
      temperature: this.props.temperature,
      humidity: this.props.humidity,
      distance: this.props.distance,
    };
  }

  /** render component */
  render() {
    return (
      <tr>
        <td scope="row">{this.state.time}</td>
        <td scope="row">{this.state.temperature}</td>
        <td scope="row">{this.state.humidity}</td>
        <td scope="row">{this.state.distance}</td>
      </tr>
    );
  }
}
