import React, { Component } from "react";
import Garage from "./garage.component";

/**
 * Main Component to display an overview of all parking garages in aarhus
 */

export default class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    fetch(
      "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=2a82a145-0195-4081-a13c-b0e587e9b89c"
    )
      .then((response) => response.json())
      .then((data) => this.convertInArray(data.result.records))
      .catch(console.error("error fetching data"));
  }

  convertInArray(data) {
    console.log("converting array");
    var array = [];
    data.forEach((element) => {
      const entry = {
        garageCode: element.garageCode,
        totalSpaces: element.totalSpaces,
        vehicleCount: element.vehicleCount,
      };
      console.log(element);
      array.push(entry);
    });
    this.setState({ data: array });
    return array;
  }

  dataList() {
    return this.state.data.map((garage) => {
      // using custom component
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
            <h1 class="display-3">Current Measurements</h1>
          </header>
          <body>
            <table class="table table-bordered">
              <thead class="thead-dark">
                <th scope="col">GarageID </th>
                <th scope="col">Total Spaces </th>
                <th scope="col">vehicle count </th>
              </thead>
              {this.dataList()}
            </table>
          </body>
        </div>
      </div>
    );
  }
}
