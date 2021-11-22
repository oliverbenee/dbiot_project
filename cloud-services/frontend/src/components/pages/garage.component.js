import React, { Component } from "react";
import "./garage.css";
import GarageDetails from "./garage.detail.component";

/**
 * Component to display the parking garage
 *
 */

export default class Garage extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    // use props to set state
    this.state = {
      garageCode: this.props.garageCode,
      totalSpaces: this.props.totalSpaces,
      vehicleCount: this.props.vehicleCount,
      time: this.props.time,
      color: "",
    };
  }

  componentDidMount() {
    if (!this.state.totalSpaces == 0) {
      var capacity = (this.state.vehicleCount / this.state.totalSpaces) * 100;

      if (capacity > 75) {
        this.setState({ color: "orange" });
      } else if (capacity == 100) {
        this.setState({ color: "red" });
      } else {
        this.setState({ color: "green" });
      }
    } else {
      this.setState({ color: "red" });
    }
  }

  handleClick() {
    console.log("Click garage item: " + this.state.garageCode);
    return (
      <GarageDetails
        garageCode={this.state.garageCode}
        totalSpaces={this.state.totalSpaces}
        vehicleCount={this.state.vehicleCount}
        color={this.state.color}
      />
    );
  }

  /** render component */
  render() {
    return (
      <tr className={this.state.color} onClick={this.handleClick}>
        <td scope="row">{this.state.garageCode}</td>
        <td scope="row">
          {this.state.vehicleCount} / {this.state.totalSpaces}
        </td>
      </tr>
    );
  }
}
