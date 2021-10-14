'use strict'
const dht = require('node-dht-sensor')
const Gpio = require('onoff').Gpio
const PigPio = require('pigpio').Gpio;
var mqtt = require('mqtt');

const intervalN = setInterval(() => {
    this.read()
}, 3000)

// MQTT

var mqttBroker = 'mqtt://broker:1883';
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

// receive messages
client.on("message", function (topic, message, packet) {
    console.log("message is " + message);
    console.log("topic is " + topic);
  });


var topic = 'home/sensor/distance';

//publish function
function publish(topic, msg) {
    if (client.connected == true) {
      client.publish(topic, msg, () => {
        console.log('publishing', msg);
      });
    }
  }


/*
  Pins.
  
  DHT Sensor connected to GPIO 12
  LED connected to GPIO 4
  HC-SR04 TrigPin connected to GPIO 23
 */

//  The DHT sensor has the model number 11, and is connected to GPIO pin 12 on our Raspberry Pi.
dht.initialize(11, 12)
//  The LED added to our Raspberry Pi, and is connected to GPIO pin 4 on our Raspberry Pi.
const led = new Gpio('4', 'out') // It "has to be" '4' now. What. LOL! TODO: WHY?????

// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius.
const MICROSECDONDS_PER_CM = 1e6/34321;
const trigger = new PigPio(23, {mode: PigPio.OUTPUT});
const echo = new PigPio(24, {mode: PigPio.INPUT, alert: true});
trigger.digitalWrite(0); // Make sure trigger is low

// HC-SR04 distance sensor code.
var dist = 0;
const watchHCSR04 = () => {
    let startTick;
  
    echo.on('alert', (level, tick) => {
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

/*
  Read sensor values:
  return object dhtData with elements: 
  - temperature
  - humidity
  - distance
*/

exports.read = function read() {
    //read DHT value
    let dhtreadout = dht.read();
    let led_status = led.readSync();

    const dhtData = {
        temperature: dhtreadout.temperature.toFixed(2),
        humidity: dhtreadout.humidity.toFixed(2),
        distance: dist,
        led_status
    };
    console.log('temperature: ' + dhtData.temperature + 'C, ' + 'humidity: ' + dhtData.humidity + '%, ' + 'distance: ' + dhtData.distance + ' led-status: '+ led_status);
    
    publish(topic, JSON.stringify(dhtData));

    return dhtData;
}

//Toggle LED
exports.toggleLed = function toggleLed() {
  if(led.readSync() == 0) {led.writeSync(1);}
  else {led.writeSync(0);}
}

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on('SIGINT', () => {
    console.log('Closing program. Returning to console.')
    led.unexport();
    process.exit()
});
