'use strict'
const PigPio = require('pigpio').Gpio;

/*
 * Create distance sensor reading and save to variable dist. 
 */
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius.
const MICROSECONDS_PER_CM = 1e6/34321;
const trigger = new PigPio(23, {mode: PigPio.OUTPUT});
const echo = new PigPio(24, {mode: PigPio.INPUT, alert: true});
trigger.digitalWrite(0); // Make sure trigger is low

var dist = 0; // store distance value. 
function watchHCSR04(){
    let startTick;
    echo.on('alert', (level, tick) => {
      if (level == 1) {
        startTick = tick;
      } else {
        const endTick = tick;
        const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
        dist = diff / 2 / MICROSECONDS_PER_CM;
      }
    });
  };
watchHCSR04();
// Trigger a distance measurement once per second
setInterval(() => {
    trigger.trigger(10, 1); // Set trigger high for 10 microseconds
}, 3000);

module.exports.dist = dist;
  