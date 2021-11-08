// Import submodules.
import { latestDistance, printDistProof } from "./devices/distance_plugin.js"
import { setLedState, printLedProof } from "./devices/led_plugin.js"
import { getOccupied, printMagProof } from "./devices/magsens_plugin.js"
//const distsens = require('./devices/distance_plugin')

// This is printing code used to prove that the magnetic sensor and distance sensor are running in the sensor plugin.
printMagProof() // Prove magSensor is running.
printLedProof(); // Prove LED is running.
printDistProof(); // Prove dist sensor is running.

import mqtt from "mqtt";

var mqttBroker = "mqtt://broker:1883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
var mqttBrokerCloud = "mqtt://40.88.197.102:1883";
var client = mqtt.connect(mqttBroker, mqtt_options);
var clientCloud = mqtt.connect(mqttBrokerCloud);

// TODO: We need to determine which parking spot, we represent!
var spotNumber = 1;

// succesfull connected
client.on("connect", function () {
  console.log("connected to local broker: " + client.connected);
  console.log("connected to cloud broker: " + clientCloud.connected);

  //client.subscribe("home/sensor/led") TODO: UNCOMMENT LINE FOR TESTING
  client.subscribe("home/sensor/led/" + spotNumber);
  console.log("sensor subscribed to: home/sensor/led/" + spotNumber)
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
  console.log("sensor received topic: '" + topic + "'");
  console.log("publisher received message: '" + message + "'");
  if (topic.substring(0, 16) == "home/sensor/led/" + spotNumber) { // this is the line causing issues.
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa")
    if(message == "on"){setLedState(1)}
    if(message == "off"){setLedState(0)}
    //toggleLed TODO: ????
  } else {
    console.log("MESSG: '" + message + "' - TOPC: '" + topic +"'")
  }
});

var topic = "home/sensor/distance/" + spotNumber;

//publish function
function publish(topic, msg) {
  if (client.connected == true && clientCloud.connected == false) {
    // TODO: RE-enable for debugging
    //console.log("local mqtt status=  " + client.connected);
    //console.log("cloud mqtt status=  " + clientCloud.connected);

    client.publish(topic, msg, () => {
      console.log("publishing" + msg + " on channel: " + topic);
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
function read() {
  var magsens_status = getOccupied();
  var distance = latestDistance // TODO: FIXXX. 

  // Activate LED based on magSens value
  // setLedState(magsens_status)

  const data = {
    magsens_status: magsens_status,
    distance: distance
  }

  console.log("magsens: " + magsens_status + " | distance: " + distance)

  // Toggle LED to indicate occupation (just as a sample)

  // Setting LED state if:
  // - magnetic sensor is triggered,
  // - and car is 10-20 cm away from the wall.
  // TODO: Should this toggle the LED? No right?
//if(magsens_status == 1 && distance > 10 && distance < 20) {
//  setLedState(1)
//} else {
//  setLedState(0)
//}

  publish(topic, JSON.stringify(data));
  return data;
};

setInterval(() => {read()}, 3000)

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on("SIGINT", () => {
  console.log("Closing program. Returning to console.");
  process.exit();
});
