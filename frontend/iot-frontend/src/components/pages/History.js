import React, { Component } from "react";
import axios from "axios";
import Measurement from "./Measurement";

/**
 * Main Component to display current measurements and LED interaction
 */

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
        { time: "12:03", temperature: 1, humidity: 3, distance: 3 },
      ],
    };
  }

  /** called after a component is mounted */
  componentDidMount() {
    axios
      .get("http://backend:5000/data")
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  /** method to display all public created memes */
  dataList() {
    // mapping each meme in the array memes to currentmemes and make this data usable in the meme component
    return this.state.data.map((data) => {
      // using custom component
      return (
        <Measurement
          time={data.time}
          temperature={data.temperature}
          humidity={data.humidity}
          distance={data.distance}
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
