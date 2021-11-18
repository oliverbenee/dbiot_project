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
    this.state = {
      colorSlot1: "green",
      colorSlot2: "green",
      colorSlot3: "green",
      colorSlot4: "green",
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ colorSlot1: "red" });
      this.setState({ colorSlot3: "red" });
      this.setState({ colorSlot4: "red" });
    }, 6000);

    this.interval = setInterval(() => {
      this.setState({ colorSlot1: "green" });
      this.setState({ colorSlot3: "green" });
      this.setState({ colorSlot4: "green" });
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /** render component */
  render() {
    return (
      <div id="parkingArea">
        <div id="slot1" className={this.state.colorSlot1}>
          <h3>P1</h3>
        </div>
        <div id="slot2" className={this.state.colorSlot2}>
          <h3>P2</h3>
        </div>
        <div id="slot3" className={this.state.colorSlot3}>
          <h3>P3</h3>
        </div>
        <div id="slot4" className={this.state.colorSlot4}>
          <h3>P4</h3>
        </div>
      </div>
    );
  }
}
