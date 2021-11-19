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
    };
  }

  componentDidMount() {
    client.on("connect", () => {
      console.log("client connected: ", client.connected);
      client.subscribe("data/react");
    });

    client.on("message", (topic, message) => {
      console.log("frontend received message: ", message.toString());
    });

    // only for testing
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
