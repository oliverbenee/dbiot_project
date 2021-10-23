import React, { Component } from "react";

/**
 * Main Component to display current measurements and LED interaction
 */

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.toggleLed = this.toggleLed.bind(this);
    this.state = {
      time: "12:03",
      temperature: 1,
      humidity: 3,
      distance: 3,
      led_1: "",
      led_2: "",
      led_3: "",
    };
  }

  toggleLed(e) {

    // send request to toggle LED
    switch (e) {
      case 1:
        if (this.state.led_1 == 1) {
          this.setState({ led_1: 0 });
        } else {
          this.setState({ led_1: 1 });
        }
        break;
      case 2:
        if (this.state.led_2 == 1) {
          this.setState({ led_2: 0 });
        } else {
          this.setState({ led_2: 1 });
        }
        break;
      case 3:
        if (this.state.led_3 == 1) {
          this.setState({ led_3: 0 });
        } else {
          this.setState({ led_3: 1 });
        }
        break;
      default:
        break;
    }
  }

  /** render component */
  render() {
    return (
      <div class="container">
        <div>
          <header class="jumbotron my-4">
            <h1 class="display-3">Current Measurements</h1>
          </header>
          <body>
            <table class="table table-bordered">
              <thead class="thead-dark">
                <th scope="col">Time </th>
                <th scope="col">Temperature </th>
                <th scope="col">Humidity </th>
                <th scope="col">Distance </th>
              </thead>
              <tr>
                <td scope="row">{this.state.time}</td>
                <td scope="row">{this.state.temperature}</td>
                <td scope="row">{this.state.humidity}</td>
                <td scope="row">{this.state.distance}</td>
              </tr>
            </table>
            <button onClick={() => this.toggleLed(1)}>LED1</button>
            <a>{this.state.led_1}</a>
            <button onClick={() => this.toggleLed(2)}>LED2</button>
            <a>{this.state.led_2}</a>
            <button onClick={() => this.toggleLed(3)}>LED3</button>
            <a>{this.state.led_3}</a>
          </body>
        </div>
      </div>
    );
  }
}
