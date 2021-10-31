// Import submodules.
import { latestDistance } from "./devices/distance_plugin.js"
//const led = require('./devices/led_plugin')
//const magsens = require('./devices/magsens_plugin')
//const distsens = require('./devices/distance_plugin')

// This is printing code used to prove that the magnetic sensor and distance sensor are running in the sensor plugin.
//magsens.printproof();
//distsens.printproof();
//led.printProof();

const intervalN = setInterval(() => {
  this.read();
}, 3000);

import mqtt from "mqtt";

var mqttBroker = "mqtt://broker:1883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
var mqttBrokerCloud = "mqtt://40.88.197.102:1883";
var client = mqtt.connect(mqttBroker, mqtt_options);
var clientCloud = mqtt.connect(mqttBrokerCloud);

// succesfull connected
client.on("connect", function () {
  console.log("connected to local broker: " + client.connected);
  console.log("connected to cloud broker: " + clientCloud.connected);

  client.subscribe("home/sensor/led/1");
  client.subscribe("home/sensor/led/2");
  client.subscribe("home/sensor/led/3");
});

clientCloud.on("error", function (error) {
  console.log("Error: " + error);
});

// error
client.on("error", function (error) {
  console.log("Cant connect" + error);
  process.exit(1);
});

// receive messages
client.on("message", function (topic, message, packet) {
  console.log("sensor received topic: " + topic)
  if (topic.substring(0, 15) == "home/sensor/led") {
    led.toggleLed();
  }
});

var topic = "home/sensor/distance";

//publish function
function publish(topic, msg) {
  if (client.connected == true && clientCloud.connected == false) {
    console.log("local mqtt status=  " + client.connected);
    console.log("cloud mqtt status=  " + clientCloud.connected);

    client.publish(topic, msg, () => {
      console.log("publishing", msg);
    });

    clientCloud.publish(topic, msg, () => {
      console.log("publishing to cloud ", msg);
    });
  }
}

/*
  Read sensor values:
  return object data with elements: 
  - magsens_status
  - distance
*/
exports.read = function read() {
  var magsens_status = 10000 //magsens.getOccupied();
  var distance = latestDistance
  //led.toggleLed();

  console.log("magsens: " + magsens_status + " | distance: " + distance)
  //publish(topic, JSON.stringify(dhtData));
  //return dhtData;
  //console.log("fakesensor magsens status: " + magsens_status + " and distance: " + distance)
};

setInterval(() => {this.read()}, 500)

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on("SIGINT", () => {
  console.log("Closing program. Returning to console.");
  process.exit();
});
