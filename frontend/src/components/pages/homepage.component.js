import React, { Component } from "react";
import Garage from "./garage.component";
import "./homepage.css";
import * as d3 from "d3";
import ParkingZoneLineChart from "./charts/parkingzone.linechart.component";

/**
 * Main Component to display an overview of all parking garages in aarhus
 */

const API_URL_OPENDATA_PARKING_GARAGES = "http://localhost:5000/opendata";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.getHistory = this.getHistory.bind(this);
    this.state = {
      garages: [],
      pKALKVAERKSVEJ: [],
    };
  }

  componentDidMount() {
    this.getOpenData();
    this.interval = setInterval(() => this.getOpenData(), 60000);
    this.getHistory("KALKVAERKSVEJ");
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getOpenData() {
    console.log("update");
    fetch(API_URL_OPENDATA_PARKING_GARAGES)
      .then((response) => response.json())
      .then((data) => this.setState({ garages: data }))
      .catch(console.error());
  }

  getHistory(zone) {
    Promise.all([
      fetch("http://localhost:5000/history/" + zone + "/1"),
      fetch("http://localhost:5000/history/" + zone + "/1"),
      fetch("http://localhost:5000/history/" + zone + "/2"),
      fetch("http://localhost:5000/history/" + zone + "/3"),
      fetch("http://localhost:5000/history/" + zone + "/4"),
      fetch("http://localhost:5000/history/" + zone + "/5"),
      fetch("http://localhost:5000/history/" + zone + "/6"),
      fetch("http://localhost:5000/history/" + zone + "/7"),
    ])
      .then((responses) => {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then((data) => {
        var array = [];
        data.forEach((element) => {
          array.push(element[0].average);
        });
        return array;
      })
      .then((array) => {
        this.setState({ pKALKVAERKSVEJ: array });
      });
  }

  garageList() {
    return this.state.garages.map((garage) => {
      return (
        <Garage
          garageCode={garage.garageCode}
          totalSpaces={garage.totalSpaces}
          vehicleCount={garage.vehicleCount}
        />
      );
    });
  }

  /** render component */
  render() {
    return (
      <div class="container">
        <header class="jumbotron my-4">
          <h3 class="display-3">Parking Aarhus</h3>
        </header>
        <body>
          <table>
            <thead>
              <th>Garage </th>
              <th>Capacity </th>
            </thead>
            {this.garageList()}
          </table>
        </body>
        <ParkingZoneLineChart data={this.state.pKALKVAERKSVEJ} />
      </div>
    );
  }
}
