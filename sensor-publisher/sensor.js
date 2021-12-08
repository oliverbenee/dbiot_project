// Import submodules.
import { latestDistance, printDistProof } from "./devices/distance_plugin.js";
import { setLedState, printLedProof } from "./devices/led_plugin.js";
import { getOccupied, printMagProof } from "./devices/magsens_plugin.js";

// Run the tripwire plugin
import { printTripProof } from "./devices/tripwire_plugin.js";

// This is printing code used to prove that the magnetic sensor and distance sensor are running in the sensor plugin.
printMagProof(); // Prove magSensor is running.
printLedProof(); // Prove LED is running.
printDistProof(); // Prove dist sensor is running.
printTripProof(); // Prove that the tripwire is running.

import mqtt from "mqtt";

var mqttBroker = "ws://broker:8883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
// TODO change to DNS iot-chickenkiller
var mqttBrokerCloud = "ws://20.67.218.11:8883";
var client = mqtt.connect(mqttBroker, mqtt_options);
var clientCloud = mqtt.connect(mqttBrokerCloud, mqtt_options);

var spotNumber = 4; // <<---------------------------------------------------------------- THIS NUMBER SETS THE SPOT NUMBER YOU WANT
spotNumber = spotNumber.toString();

// succesfull connected
client.on("connect", function () {
  console.log("connected to local broker: " + client.connected);
  console.log("connected to cloud broker: " + clientCloud.connected);

  client.subscribe("home/sensor/led/" + spotNumber);
  console.log("sensor subscribed to: home/sensor/led/" + spotNumber);

  client.subscribe("home/navigation/available");
});

clientCloud.on("error", function (error) {
  console.log("host: " + mqttBrokerCloud);
  console.log("Error: " + error);
});

// error
client.on("error", function (error) {
  console.log("Cant connect" + error);
  process.exit(1);
});

// receive messages
client.on("message", function (topic, message, packet) {
  //console.log("sensor received a new message on topic: '" + topic + "', and message: '" + message + "'");
  if (topic == "home/sensor/led/" + spotNumber) {
    if (message == "on") {
      setLedState(1);
    }
    if (message == "off") {
      setLedState(0);
    }
  } else if (topic == "home/navigation/available") {
    if (message == spotNumber) {
      printLedProof();
    }
  } else {
    console.log("MESSG: '" + message + "' - TOPC: '" + topic + "'");
  }
});

var topic = "home/sensor/distance/" + spotNumber;

publish(topic, "on");

//publish function
function publish(topic, msg) {
  if (client.connected == true && clientCloud.connected == true) {
    // Re-enable for debugging
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
  var distance = latestDistance;

  // Activate LED based on magSens value
  // setLedState(magsens_status)

  const data = {
    magsens_status: magsens_status,
    distance: distance,
  };

  console.log("magsens: " + magsens_status + " | distance: " + distance);

  // Toggle LED to indicate occupation (just as a sample)

  // Setting LED state if:
  // - magnetic sensor is triggered,
  // - and car is 10-20 cm away from the wall.
  // Should this toggle the LED? No right?
  //if(magsens_status == 1 && distance > 10 && distance < 20) {
  //  setLedState(1)
  //} else {
  //  setLedState(0)
  //}

  publish(topic, JSON.stringify(data));
  return data;
}

setInterval(() => {
  read();
}, 3000);

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on("SIGINT", () => {
  console.log("Closing program. Returning to console.");
  process.exit();
});
