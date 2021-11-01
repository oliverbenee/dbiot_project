const express = require("express");
const app = express();
const Database = require("./database/db");
const cors = require("cors");

// mqtt
var mqtt = require("mqtt");

// setup mqtt
var mqttBroker = "mqtt:broker:1883";
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
    console.log("message is " + message + " , and topic is " + topic);
    var values = JSON.parse(message)
    console.log("got magsens status: " + values.magsens_status + " and distance: " + values.distance)
    //TODO: Do what with the magsens status and distance???
    if(values.magsens_status == 1 && values.distance > 10 && values.distance < 20) {
      publish("home/sensor/led", "on")
    } else {
      publish("home/sensor/led", "off")
    }

    
    



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
const { options } = require("./controllers/routes.js");
console.log(`Routes ${routes}`);

app.use(cors());
app.use("/", routes);

app.listen(5000, () => console.log("Example app is listening on port 5000."));
