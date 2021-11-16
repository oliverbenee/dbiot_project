import express from "express";
const app = express();
import cors from "cors";
import { router } from "./controllers/routes.js";
import { Database } from "./mysql/db.js";

// mqtt
import mqtt from "mqtt";

// setup mqtt
var mqttBroker = "mqtt:broker:1883";
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
    var spotNumber = parseInt(topic.substring(21));
    var parkingZoneID = "KALKVAERKSVEJ";
    var values = JSON.parse(message);

    //console.log("got data from sensor no.: " + topic.substring(21)); //UNCOMMENT THIS LINE FOR DEBUG
    //console.log("got magsens status: " + values.magsens_status + " and distance: " + values.distance) //UNCOMMENT THIS LINE FOR DEBUG

    var newState = {
      isOccupied: false,
      slotID: spotNumber,
      parkingZoneID: parkingZoneID
    }
    var publishstate = "off";

    var isOccupied = values.magsens_status == 1 && values.distance > minDistance && values.distance < maxDistance
    if (isOccupied) {
      publishstate = "on";
      newState.isOccupied = true;
    }
    publish("home/sensor/led/" + spotNumber.toString(), publishstate);
    console.log("Spot number: " + spotNumber + " occupation is now: " + publishstate);
    Database.updateParkingSlot(newState);
  }
  // console.log("___________________________"); //UNCOMMENT THIS LINE FOR DEBUG
  // DEBUG: goto localhost:5000/parkingslots/KALKVAERKSVEJ for checking
});

//publish function
function publish(topic, msg) {
  if (client.connected == true) {
    client.publish(topic, msg, () => {
      //console.log("server publishing: " + msg + " to: '" + topic + "'"); TODO: UNCOMMENT THIS LINE FOR DEBUG
    });
  }
}

console.log(`Routes ${router}`);
// parse json data
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(5000, () => console.log("Example app is listening on port 5000."));
