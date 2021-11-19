import express from "express";
const app = express();
import cors from "cors";
import { router } from "./controllers/routes.js";
import mqtt from "mqtt";

// setup mqtt
var mqttBroker = "ws://localhost:8883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
var client = mqtt.connect(mqttBroker, mqtt_options);
var topic = ["home/sensor/distance", "home/sensor/led"];

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

// receive messages
client.on("message", function (topic, message, packet) {
  console.log("___________________________");
  console.log("server received new message");
  if (topic == "home/sensor/distance") {
    // receiving message and checking values
    // publishing via websockets to change color of parking slot
    // activate or deactivate the led
    console.log("message is " + message);
    Database.insert(JSON.parse(message));
    console.log("topic is " + topic);
  } else if (topic == "home/sensor/led") {
    console.log("message is " + message);
    console.log("topic is " + topic);
  }
  console.log("___________________________");
});

//publish function
function publish(topic, msg) {
  if (client.connected == true) {
    client.publish(topic, msg, () => {
      console.log("publishing", msg);
    });
  }
}

// test case
function publishTest1() {
  const data = {
    parkingSlotID: 1,
    isOccupied: true,
  };

  console.log("publish test message websockets");
  publish("/parkingslot/actuator", JSON.stringify(data));
}

// test case
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

console.log(`Routes ${router}`);
// parse json data
app.use(express.json());
app.use(cors());
app.use("/", router);

app.listen(5000, () => console.log("Example app is listening on port 5000."));
