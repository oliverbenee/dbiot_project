import React, { Component } from "react";
import GarageTable from "./garage.table.component";
import "./css/homepage.css";
import { Table } from "react-bootstrap";
import AreaChart from "./charts/areachart.component";

/**
 * Main Component to display an overview of all parking garages in aarhus
 */

const host = process.env.REACT_APP_HOST;

const API_URL_OPENDATA_PARKING_GARAGES = "http://" + host + ":5000/opendata";
const parkingZones = [
  "KALKVAERKSVEJ",
  "NewBusgadehuset",
  "SALLING",
  "NORREPORT",
  "Urban Level 1",
  "Urban Level 2+3",
  "Navitas",
  "New Bruuns Galleri",
  "SCANDCENTER",
  "MAGASIN",
  "BRUUNS",
];

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.getHistory = this.getHistory.bind(this);
    this.state = {
      garages: [],
      pKALKVAERKSVEJ: [],
      pNewBusgadehuset: [],
      pSALLING: [],
      pNORREPORT: [],
      pUrbanLevel1: [],
      pMAGASIN: [],
      pSCANDCENTER: [],
      pNewBruunsGalleri: [],
      pUrbanLevel23: [],
      pNavitas: [],
      pBruuns: [],
    };
  }

  componentDidMount() {
    this.getOpenData();
    this.interval = setInterval(() => {
      this.getOpenData();
      this.getAllHistoricalData();
    }, 300000);
    // todo refresh historical data for chart
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
    fetch(API_URL_OPENDATA_PARKING_GARAGES)
      .then((response) => response.json())
      .then((data) => this.setState({ garages: data }))
      .catch(console.error());
  }

  // get historical data from opendata.dk for one specific parking garage
  getHistory(zone) {
    Promise.all([
      fetch("http://" + host + ":5000/history/" + zone + "/1"),
      fetch("http://" + host + ":5000/history/" + zone + "/2"),
      fetch("http://" + host + ":5000/history/" + zone + "/3"),
      fetch("http://" + host + ":5000/history/" + zone + "/4"),
      fetch("http://" + host + ":5000/history/" + zone + "/5"),
      fetch("http://" + host + ":5000/history/" + zone + "/6"),
      fetch("http://" + host + ":5000/history/" + zone + "/7"),
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

        console.log(data)

        // sort array by time
        data.sort((a, b) => {
          let da = new Date(a.time);
          let db = new Date(b.time);

          return da - db;
        });

        data.forEach((element) => {
          array.push(element[0]);
        });
        return array;
      })
      .then((array) => {
        var data = [];

        var day = 1;
        for (let index = 0; index < array.length; index++) {
          const element = array[index];

          var value = (element.average / element.totalCapacity) * 100;

          var item = {
            x: day,
            y: value,
          };
          data.push(item);
          day++;
        }

        return data;
      })
      .then((data) => {
        switch (zone) {
          case "KALKVAERKSVEJ":
            console.log("KALKVAERKSVEJ", data);
            this.setState({ pKALKVAERKSVEJ: data });
            break;

          case "SCANDCENTER":
            console.log("SCANDCENTER", data);
            this.setState({ pSCANDCENTER: data });
            break;

          case "NewBusgadehuset":
            console.log("NewBusgadehuset", data);
            this.setState({ pNewBusgadehuset: data });
            break;

          case "SALLING":
            console.log("SALLING", data);
            this.setState({ pSALLING: data });
            break;

          case "Navitas":
            console.log("Navitas", data);
            this.setState({ pNavitas: data });
            break;

          case "BRUUNS":
            console.log("BRUUNS", data);
            this.setState({ pBruuns: data });
            break;

          case "NORREPORT":
            console.log("NORREPORT", data);
            this.setState({ pNORREPORT: data });
            break;

          case "Urban Level 1":
            console.log("Urban Level 1", data);
            this.setState({ pUrbanLevel1: data });
            break;

          case "MAGASIN":
            console.log("MAGASIN", data);
            this.setState({ pMAGASIN: data });
            break;

          case "Urban Level 2+3":
            console.log("Urban Level 2+3", data);
            this.setState({ pUrbanLevel23: data });
            break;

          case "New Bruuns Galleri":
            console.log("New Bruuns Galleri", data);
            this.setState({ pNewBruunsGalleri: data });
            break;

          default:
            break;
        }
      });
  }

  garageList() {
    return this.state.garages.map((garage) => {
      return (
        <GarageTable
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
      <div id="homepage-component" class="container">
        <body>
          <Table id="GarageTable" striped bordered hover>
            <thead>
              <th>Garage</th>
              <th>Vehicle Count</th>
              <th>Capacity</th>
            </thead>
            <tbody>{this.garageList()}</tbody>
          </Table>
          <h3 id="overview">Overview Usage</h3>
          <AreaChart data={this.state.pKALKVAERKSVEJ} title={"KALKVAERKSVEJ"} />
          <AreaChart
            data={this.state.pNewBusgadehuset}
            title={"NewBusgadehuset"}
          />
          <AreaChart data={this.state.pBruuns} title={"BRUUNS"} />
          <AreaChart data={this.state.pSALLING} title={"SALLING"} />
          <AreaChart data={this.state.pNORREPORT} title={"NORREPORT"} />
          <AreaChart data={this.state.pUrbanLevel1} title={"Urban Level 1"} />
          <AreaChart
            data={this.state.pUrbanLevel23}
            title={"Urban Level 2 + 3"}
          />
          <AreaChart data={this.state.pMAGASIN} title={"MAGASIN"} />
          <AreaChart data={this.state.pSCANDCENTER} title={"SCANDCENTER"} />
          <AreaChart
            data={this.state.pNewBruunsGalleri}
            title={"New Bruuns Galleri"}
          />
          <AreaChart data={this.state.pNavitas} title={"Navitas"} />
        </body>
      </div>
    );
  }
}
