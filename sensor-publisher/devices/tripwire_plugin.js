'use strict'
import { Gpio } from 'onoff'
import mqtt from "mqtt";
var mqttBroker = "ws://broker:8883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
// TODO change to DNS iot-chickenkiller
var mqttBrokerCloud = "ws://52.236.0.131:8883";
var client = mqtt.connect(mqttBroker, mqtt_options);
var clientCloud = mqtt.connect(mqttBrokerCloud, mqtt_options);

client.on("connect", function () {
  client.subscribe("home/sensor/tripwire")
  console.log("sensor subscribed to: home/sensor/tripwire")
});

clientCloud.on("error", function (error) {
  console.log("error tripwire")
  console.log("Error: " + error);
});
// error
client.on("error", function (error) {
  console.log("Cant connect" + error);
  process.exit(1);
});

var topic = "home/sensor/tripwire";

//publish function
function publish(topic, msg) {
  if (client.connected == true && clientCloud.connected == true) {
    client.publish(topic, msg, () => {
      console.log("publishing" + msg + " on channel: " + topic);
    });

    clientCloud.publish(topic, msg, () => {
      console.log("publishing to cloud ", msg);
    });
  }
}

const tripWire = new Gpio('17', 'in', 'rising')

tripWire.watch((err, value) => {
  if(err) throw err
  // TripWire triggered.
  publish("home/sensor/tripwire", "trigger")
  console.log("tripwire did thing.");
})

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on('SIGINT', () => {
  tripWire.unexport();
  console.log('Closing program. Returning to console.')
  process.exit()
});

export function printTripProof() {
  console.log("Sensor merger and tripwire plugin has connection.")
}