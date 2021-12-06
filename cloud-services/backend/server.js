import express from "express";
const app = express();
import cors from "cors";
import { router } from "./controllers/routes.js";
import mqtt from "mqtt";
import fetch from "node-fetch";
import * as navigation from "./navigation/navcolumns.js"

// setup mqtt
import { Database } from "./mysql/db.js";

// setup mqtt
var mqttBroker = "ws://broker:8883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
var client = mqtt.connect(mqttBroker, mqtt_options);

var topic = ["home/sensor/distance/#", "home/sensor/led/#"];

// succesfull connected
client.on("connect", function () {
  console.log("connected " + client.connected);
  // subscribe to channel
  console.log("subscribe");
  client.subscribe(topic);
});

// error
client.on("error", function (error) {
  console.log("Cant connect " + error);
  process.exit(1);
});

var minDistance = 10;
var maxDistance = 20;

// receive messages
client.on("message", function (topic, message, packet) {
  console.log("___________________________"); //UNCOMMENT THIS LINE FOR DEBUG
  console.log("server received new message on topic: " + topic); //UNCOMMENT THIS LINE FOR DEBUG
  if (topic.substring(0, 20) == "home/sensor/distance") {
    // These shenanigans split the topic up into an array, seperated by the "/".
    // The last element MUST BE the spot number.
    // The second to last element MUST be the parkingZoneID.
    var topiclist = topic.split("/");
    var spotNumber = parseInt(topiclist.pop());
    var parkingZoneID = "INCUBA";

    var values = JSON.parse(message);

    //console.log("got magsens status: " + values.magsens_status + " and distance: " + values.distance) //UNCOMMENT THIS LINE FOR DEBUG

    var newState = {
      isOccupied: false,
      slotID: spotNumber,
      parkingZoneID: parkingZoneID,
    };
    var publishstate = "off";

    var isOccupied =
      values.magsens_status == 1 &&
      values.distance > minDistance &&
      values.distance < maxDistance;
    if (isOccupied) {
      publishstate = "on";
      newState.isOccupied = true;
    }
    // publish to frontent
    const data = {
      parkingSlotID: spotNumber,
      isOccupied: isOccupied,
    };
    publish("home/parkingspot/", JSON.stringify(data));
    Database.updateParkingSlot(newState);
  }
});

//publish function
function publish(topic, msg) {
  if (client.connected == true) {
    client.publish(topic, msg, () => {
      //console.log("server publishing: " + msg + " to: '" + topic + "'"); UNCOMMENT THIS LINE FOR DEBUG
    });
  }
}

/** Test case for websockets */
function publishTest1() {
  const data = {
    parkingSlotID: 1,
    isOccupied: true,
  };
  console.log("publish test message websockets");
  publish("/home/parkingslot/", JSON.stringify(data));
}
function publishTest2() {
  const data = {
    parkingSlotID: 1,
    isOccupied: false,
  };

  console.log("publish test message websockets");
  publish("/parkingslot/actuator", JSON.stringify(data));
}

setInterval(publishTest1, 6000);
setInterval(publishTest2, 10000);

function publishAvailableParkingSlot(){
  var nearest = navigation.getNearestAvailableSlot();
  console.log("Nearest available slot: " + nearest)
  publish("home/navigation/available", JSON.stringify(nearest))
}



/**fetch data from opendata.dk --> Interval 5 min */
const API_URL_OPENDATA_PARKING_GARAGES =
  "https://admin.opendata.dk/api/3/action/datastore_search?resource_id=2a82a145-0195-4081-a13c-b0e587e9b89c";
setInterval(() => {
  fetch(API_URL_OPENDATA_PARKING_GARAGES)
    .then((response) => response.json())
    .then((data) => {
      Database.insertOpenData(data.result.records);
      //console.log("router inserting data.")
    })
    .catch(console.error());
}, 300000);

console.log(`Routes ${router}`);
// parse json data
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(5000, () => console.log("Example app is listening on port 5000."));
