import React, { Component } from "react";
import "./garage.css";

/**
 * Component to display the parking garage
 */

export default class GarageDetails extends Component {
  constructor(props) {
    super(props);

    // use props to set state
    this.state = {
      garageCode: this.props.garageCode,
      totalSpaces: this.props.totalSpaces,
      vehicleCount: this.props.vehicleCount,
      time: this.props.time,
      color: this.props.color,
    };
  }

  /** render component */
  render() {
    return (
      <div>
        <header class="jumbotron my-4">
          <h3 class="display-3">{this.state.garageCode}</h3>
        </header>
        <tr className={this.state.color}>
          <td scope="row">
            {this.state.vehicleCount} / {this.state.totalSpaces}{" "}
          </td>
        </tr>
      </div>
    );
  }
}
