import React, { Component } from "react";
import Measurement from "./Measurement";

/**
 * Main Component to display current measurements and LED interaction
 */

export default class History extends Component {
  constructor(props) {
    super(props);
    this.loadData = this.loadData.bind(this);
    this.state = {
      measurements: [],
      
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/data")
      .then((response) => response.json())
      .then((data) => this.setState({ measurements: data }))
      .catch(console.error());
  }

  loadData() {


    // update over time
  }

  dataList() {
    return this.state.measurements.map((measurements) => {
      // using custom component
      return (
        <Measurement
          time={measurements.time}
          temperature={measurements.temperature}
          humidity={measurements.humidity}
          distance={measurements.distance}
        />
      );
    });
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
            <table class="table table-striped">
              <thead class="thead-dark">
                <th scope="col">Time </th>
                <th scope="col">Temperature </th>
                <th scope="col">Humidity </th>
                <th scope="col">Distance </th>
              </thead>
              {this.dataList()}
            </table>
          </body>
        </div>
      </div>
    );
  }
}
