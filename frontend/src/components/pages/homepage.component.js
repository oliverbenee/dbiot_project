import React, { Component } from "react";
import Garage from "./garage.component";
import "./homepage.css";
import * as d3 from "d3";
import ParkingZoneLineChart from "./charts/parkingzone.linechart.component";

/**
 * Main Component to display an overview of all parking garages in aarhus
 */

const API_URL_OPENDATA_PARKING_GARAGES = "http://localhost:5000/opendata";
const parkingZones = ["KALKVAERKSVEJ", "NewBusgadehuset", "SALLING"];

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.getHistory = this.getHistory.bind(this);
    this.state = {
      garages: [],
      pKALKVAERKSVEJ: [],
      pNewBusgadehuset: [],
      pSALLING: [],
    };
  }

  componentDidMount() {
    this.getOpenData();
    this.interval = setInterval(() => this.getOpenData(), 60000);
    this.getAllHistoricalData();
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // get historical data from opendata.dk for all registered parking garages
  getAllHistoricalData() {
    parkingZones.forEach((element) => this.getHistory(element));
  }

  getOpenData() {
    console.log("update");
    fetch(API_URL_OPENDATA_PARKING_GARAGES)
      .then((response) => response.json())
      .then((data) => this.setState({ garages: data }))
      .catch(console.error());
  }

  // get historical data from opendata.dk for one specific parking garage
  getHistory(zone) {
    Promise.all([
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

        // sort array by time
        data.sort((a, b) => {
          let da = new Date(a.time);
          let db = new Date(b.time);

          return da - db;
        });

        data.forEach((element) => {
          array.push(element[0].average);
        });
        return array;
      })
      .then((array) => {
        switch (zone) {
          case "KALKVAERKSVEJ":
            console.log("KALKVAERKSVEJ", array);
            this.setState({ pKALKVAERKSVEJ: array });
            break;

          case "NewBusgadehuset":
            console.log("NewBusgadehuset", array);
            this.setState({ pNewBusgadehuset: array });
            break;

          case "SALLING":
            console.log("SALLING", array);
            this.setState({ pSALLING: array });
            break;

          default:
            break;
        }
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
        <ParkingZoneLineChart
          KALKVAERKSVEJ={this.state.pKALKVAERKSVEJ}
          NewBusgadehuset={this.state.pNewBusgadehuset}
          Salling={this.state.pSALLING}
        />
      </div>
    );
  }
}
