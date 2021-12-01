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
const tParkingslot = "/home/parkingslot/";
const tNavigation = "/home/navigation";

export default class Garage extends Component {
  constructor(props) {
    super(props);

    this.setNavigation = this.setNavigation.bind(this);

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
      navigation: "false",
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
      console.log(topic);

      if (topic == tParkingslot) {
        switch (value.parkingSlotID) {
          case 1:
            if (value.isOccupied == true) this.setState({ colorSlot1: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot1: "green" });
            break;
          case 2:
            if (value.isOccupied == true) this.setState({ colorSlot2: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot2: "green" });
            break;
          case 3:
            if (value.isOccupied == true) this.setState({ colorSlot3: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot3: "green" });
            break;
          case 4:
            if (value.isOccupied == true) this.setState({ colorSlot4: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot4: "green" });
            break;
          case 5:
            if (value.isOccupied == true) this.setState({ colorSlot5: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot5: "green" });
            break;
          case 6:
            if (value.isOccupied == true) this.setState({ colorSlot6: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot6: "green" });
            break;
          case 7:
            if (value.isOccupied == true) this.setState({ colorSlot7: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot7: "green" });
            break;
          case 8:
            if (value.isOccupied == true) this.setState({ colorSlot8: "red" });
            else if (value.isOccupied == false)
              this.setState({ colorSlot8: "green" });
            break;
          default:
            break;
        }
      } else if (topic == tNavigation) {
        console.log(value)
        this.setNavigation(value);
      }
    });
  }

  /**trigger and clear navigation animation */
  setNavigation(slot) {
    console.log("set navigation");
    this.setState({ colorSlot2: "navigation-effect" });
    setTimeout(() => this.setState({ colorSlot2: "green" }), 5000);

    // switch (slot) {
    //   case 1:
    //     this.setState({ colorSlot1: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot1: "green" }), 5000);
    //     break;
    //   case 2:
    //     this.setState({ colorSlot2: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot2: "green" }), 5000);
    //     break;
    //   case 3:
    //     this.setState({ colorSlot3: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot3: "green" }), 5000);
    //     break;
    //   case 4:
    //     this.setState({ colorSlot4: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot4: "green" }), 5000);
    //     break;
    //   case 5:
    //     this.setState({ colorSlot5: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot5: "green" }), 5000);
    //     break;
    //   case 6:
    //     this.setState({ colorSlot6: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot6: "green" }), 5000);
    //     break;
    //   case 7:
    //     this.setState({ colorSlot7: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot7: "green" }), 5000);
    //     break;
    //   case 8:
    //     this.setState({ colorSlot8: "navigation-effect" });
    //     setTimeout(() => this.setState({ colorSlot8: "green" }), 5000);
    //     break;
    //   default:
    //     break;
    // }
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
        <button onClick={this.setNavigation}>Show Free Slots</button>
      </div>
    );
  }
}
