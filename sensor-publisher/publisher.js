var mqtt = require('mqtt');

var mqttBroker = 'mqtt://localhost:1883';
var client = mqtt.connect(mqttBroker);

// succesfull connected
client.on('connect', function () {
  console.log('connected ' + client.connected);
});

// error
client.on("error", function (error) {
  console.log('Cant connect' + error);
  process.exit(1);
});

var message = 'TESTETSTTETESTTS';
var topic = 'home/sensor/distance';


//publish every 5 secs
var timer_id = setInterval(function () {
  publish(topic, message);
}, 5000);

//publish function
function publish(topic, msg) {
  if (client.connected == true) {
    console.log('publishing', msg);
    client.publish(topic, msg);
  }
}
