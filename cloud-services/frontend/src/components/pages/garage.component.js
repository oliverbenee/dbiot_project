import React, { Component } from "react";
import "./css/garage.css";
import mqtt from "mqtt";

/**
 * Component to display the parking garage
 *
 */

const mqttBroker = "ws://localhost:8883";
const mqtt_options = {
  username: "client",
  password: "secret",
};
const client = mqtt.connect(mqttBroker, mqtt_options);

export default class Garage extends Component {
  constructor(props) {
    super(props);

    // use props to set state
    this.state = {
      colorSlot1: "green",
      colorSlot2: "green",
      colorSlot3: "green",
      colorSlot4: "green",
      colorSlot5: "green",
      colorSlot6: "green",
      colorSlot7: "green",
      colorSlot8: "green",
    };
  }

  componentDidMount() {
    client.on("connect", () => {
      console.log("client connected: ", client.connected);
      client.subscribe("/home/parkingslot/");
    });

    client.on("message", (topic, message) => {
      const value = JSON.parse(message);
      console.log("frontend received message: ", value);

      switch (value.parkingSlotID) {
        case 1:
          if (value.isOccupied == true) this.setState({ colorSlot1: "red" });
          else if (value.isOccupied == false)
            this.setState({ colorSlot1: "green" });
          break;
        default:
          break;
      }
    });

    // only for testing
    this.interval = setInterval(() => {
      this.setState({ colorSlot3: "red" });
      this.setState({ colorSlot4: "red" });
    }, 6000);

    this.interval = setInterval(() => {
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
        <div id="row1">
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
        <div id="row2">
          <div id="slot5" className={this.state.colorSlot5}>
            <h3>P5</h3>
          </div>
          <div id="slot6" className={this.state.colorSlot6}>
            <h3>P6</h3>
          </div>
          <div id="slot7" className={this.state.colorSlot7}>
            <h3>P7</h3>
          </div>
          <div id="slot8" className={this.state.colorSlot8}>
            <h3>P8</h3>
          </div>
        </div>
      </div>
    );
  }
}
