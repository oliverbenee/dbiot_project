const express = require("express");
const app = express();
const Database = require("./database/db");
const cors = require("cors");

// mqtt
var mqtt = require("mqtt");

// setup mqtt
var mqttBroker = "mqtt:broker:1883";
var client = mqtt.connect(mqttBroker);
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
exports.publish = (topic, msg) => {
  if (client.connected == true) {
    client.publish(topic, msg, () => {
      console.log("publishing", msg);
    });
  }
};

var routes = require("./controllers/routes.js");
console.log(`Routes ${routes}`);

app.use(cors());
app.use("/", routes);

app.listen(5000, () => console.log("Example app is listening on port 5000."));
