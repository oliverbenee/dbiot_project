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

  /** called after a component is mounted */
  componentDidMount() {
    /*
    
    axios
      .get("http://localhost:5000/memes")
      .then((response) => {
        // set state with memes get from api
        this.setState({ memes: response.data });
      })
      .catch((error) => {
        console.error(error);
      });

      */
  }

  /** method to display all public created memes */
  /*
  memeList() {
    // mapping each meme in the array memes to currentmemes and make this data usable in the meme component
    return this.state.memes.map((currentmemes) => {
      // using custom component
      return (
        <Meme
          url={currentmemes.url}
          titel={currentmemes.titel}
          likes={currentmemes.likes}
          id={currentmemes._id}
          comments={currentmemes.comments}
        />
      );
    }); 
  }
  */

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
