import React, { Component } from "react";
import "./css/garage.css";

/**
 * Component to display the parking garage
 *
 */

export default class Garage extends Component {
  constructor(props) {
    super(props);

    // use props to set state
    this.state = {};
  }

  componentDidMount() {}

  /** render component */
  render() {
    return (
      <div id="parkingArea">
        <div id="slot1">1
        </div>
        <div id="slot2">2
        </div>
        <div id="slot3">3
        </div>
        <div id="slot4">4
        </div>
      </div>
    );
  }
}
