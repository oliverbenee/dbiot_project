import React, { Component } from "react";

/**
 * Component to display the parking garage
 */

export default class Garage extends Component {
  constructor(props) {
    super(props);

    // use props to set state
    this.state = {
      garageCode: this.props.garageCode,
      totalSpaces: this.props.totalSpaces,
      vehicleCount: this.props.vehicleCount,
      time: this.props.time,
    };
  }

  /** render component */
  render() {
    return (
      <tr>
        <td scope="row">{this.state.garageCode}</td>
        <td scope="row">{this.state.totalSpaces}</td>
        <td scope="row">{this.state.vehicleCount}</td>
      </tr>
    );
  }
}
