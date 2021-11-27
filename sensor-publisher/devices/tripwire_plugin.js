'use strict'
import { Gpio } from 'onoff'
import mqtt from "mqtt";
var mqttBroker = "ws://broker:8883";
var mqtt_options = {
  username: "client",
  password: "secret",
};
// TODO change to DNS iot-chickenkiller
var mqttBrokerCloud = "ws://40.88.197.102:8883";
var client = mqtt.connect(mqttBroker, mqtt_options);
var clientCloud = mqtt.connect(mqttBrokerCloud);

client.on("connect", function () {
  console.log("connected to local broker: " + client.connected);
  console.log("connected to cloud broker: " + clientCloud.connected);

  client.subscribe("home/sensor/tripwire")
  console.log("sensor subscribed to: home/sensor/tripwire")
});

clientCloud.on("error", function (error) {
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
  if (client.connected == true && clientCloud.connected == false) {
    client.publish(topic, msg, () => {
      console.log("publishing" + msg + " on channel: " + topic);
    });

    clientCloud.publish(topic, msg, () => {
      console.log("publishing to cloud ", msg);
    });
  }
}

const tripWire = new Gpio('17', 'in', 'both')

tripWire.watch((err, value) => {
  if(err) throw err
  // TripWire triggered.
  //publish("home/sensor/tripwire", "trigger")
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