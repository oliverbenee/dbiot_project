"use strict";
const Gpio = require("onoff").Gpio;
const intervalN = setInterval(() => {
  this.read();
}, 3000);

var mqtt = require("mqtt");

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
  if (topic.substring(0, 15) == "home/sensor/led") {
    console.log("sensor received topic: " + topic);
    var ledNum = topic.substring(16);
    console.log("Change LED-status for led no. : " + ledNum);
    console.log("topic is " + topic);
    toggleLed(ledNum);
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
  Pins.
  
  DHT Sensor connected to GPIO 12
  LED connected to GPIO 2, 4 and 22
    Red LED connected to GPIO 4
    Blue LED connected to GPIO 2
    Green LED connected to GPIO 22
  HC-SR04 TrigPin connected to GPIO 23
 */

//  DHT sensor is faked. LOLOLOLOL
console.log(
  "If you see this, the fake sensor is being used. Remember to change it!"
);

/*
const led1 = new Gpio("4", "out");
const led2 = new Gpio("2", "out");
const led3 = new Gpio("22", "out");

module.exports.led1 = led1;
module.exports.led2 = led2;
module.exports.led3 = led3;

*/

/*
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius.
const MICROSECDONDS_PER_CM = 1e6 / 34321;
const trigger = new PigPio(23, {
    mode: PigPio.OUTPUT
});
const echo = new PigPio(24, {
    mode: PigPio.INPUT,
    alert: true
});
trigger.digitalWrite(0); // Make sure trigger is low

// HC-SR04 distance sensor code.
var dist;
const watchHCSR04 = () => {
    let startTick;

    echo.on("alert", (level, tick) => {
        if (level == 1) {
            startTick = tick;
        } else {
            const endTick = tick;
            const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
            dist = diff / 2 / MICROSECDONDS_PER_CM;
        }
    });
};
watchHCSR04();

// Trigger a distance measurement once per second
setInterval(() => {
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 1000);
*/

/*
  Read sensor values:
  return object dhtData with elements: 
  - temperature
  - humidity
  - distance
*/
exports.read = function read() {
  //read DHT value
  let dhtreadout = { temperature: 3.0, humidity: 3.0 };
  let dist = 25.0;

  // getHumidity(console.log, (err) =>
  //   console.log("øsadlkaslkdalskdlkaslkdaskldlkasldkasldkv")
  // );

  const dhtData = {
    temperature: dhtreadout.temperature.toFixed(2),
    humidity: dhtreadout.humidity.toFixed(2),
    distance: dist,
    led_1_status: 0,
    led_2_status: 0,
    led_3_status: 0,
  };
  console.log(
    "temperature: " +
      dhtData.temperature +
      "C, " +
      "humidity: " +
      dhtData.humidity +
      "%, " +
      "distance: " +
      dhtData.distance
  );
  //Dhtdata.insert(dhtData);

  publish(topic, JSON.stringify(dhtData));
  return dhtData;
};

// Faked sensor; real LED. Function takes a parameter; 1=GPIO4 ; 2=GPIO2 ; 3=GPIO22 ;
/*
function toggleLed(ledNum) {
  console.log("toggling LED number: (" + ledNum + ")");
  // set the right led
  if (ledNum == "1") {
    if (led1.readSync() == 0) {
      led1.writeSync(1);
    } else {
      led1.writeSync(0);
    }
    console.log("LED 1 now toggled");
  } else if (ledNum == "2") {
    if (led2.readSync() == 0) {
      led2.writeSync(1);
    } else {
      led2.writeSync(0);
    }
    console.log("LED 2 now toggled");
  } else if (ledNum == "3") {
    if (led3.readSync() == 0) {
      led3.writeSync(1);
    } else {
      led3.writeSync(0);
    }
    console.log("LED 3 now toggled");
  } else {
    console.log("no such led found");
  }
}

*/

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on("SIGINT", () => {
  console.log("Closing program. Returning to console.");

  /*
  led1.unexport();
  led2.unexport();
  led3.unexport();

  */
  process.exit();
});
