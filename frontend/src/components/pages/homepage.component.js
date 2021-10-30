import React, { Component } from "react";
import Garage from "./garage.component";
import "./homepage.css";

/**
 * Main Component to display an overview of all parking garages in aarhus
 */

const API_URL_OPENDATA_PARKING_GARAGES =
  "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=2a82a145-0195-4081-a13c-b0e587e9b89c";

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      garages: [],
    };
  }

  componentDidMount() {
    fetch(API_URL_OPENDATA_PARKING_GARAGES)
      .then((response) => response.json())
      .then((data) => this.setState({ garages: data.result.records }))
      .catch(console.error());
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

  // toggleLed(e) {
  //   // send request to toggle LED
  //   switch (e) {
  //     case 1:
  //       if (this.state.led_1 == 1) {
  //         this.setState({ led_1: 0 });
  //       } else {
  //         this.setState({ led_1: 1 });
  //       }
  //       break;
  //     case 2:
  //       if (this.state.led_2 == 1) {
  //         this.setState({ led_2: 0 });
  //       } else {
  //         this.setState({ led_2: 1 });
  //       }
  //       break;
  //     case 3:
  //       if (this.state.led_3 == 1) {
  //         this.setState({ led_3: 0 });
  //       } else {
  //         this.setState({ led_3: 1 });
  //       }
  //       break;
  //     default:
  //       break;
  //   }
  // }

  /** render component */
  render() {
    return (
      <div class="container">
        <div>
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
        </div>
      </div>
    );
  }
}
