import React, { Component } from "react";
import axios from "axios";
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
    this.setState({
      measurements: [
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
      ],
    });

    this.updateTimer = setInterval(() => this.loadData(), 30000);
  }

  loadData() {
    axios
      .get("http://backend:5000/data")
      .then((res) => {
        console.log("data : " + JSON.stringify(res));
        this.setState({ measurements: res });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  dataList() {
    // mapping each meme in the array memes to currentmemes and make this data usable in the meme component
    console.log("data: " + this.state.measurements);
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
