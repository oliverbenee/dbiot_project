import React, { Component } from "react";
import axios from "axios";

/**
 * Main Component to display current measurements and LED interaction
 */

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = { time: "12:03", temperature: 1, humidity: 3, distance: 3 };
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
          </body>
        </div>
      </div>
    );
  }
}
