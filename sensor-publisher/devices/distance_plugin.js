//import pkg from "pigpio";

//const { Gpio, OUTPUT, INPUT } = pkg;

export let latestDistance = null;

try {
  latestDistance = null;
  let latestPoll = null;
  // The number of microseconds it takes sound to travel 1cm at 20 degrees celcius
  const MICROSECDONDS_PER_CM = 1e6 / 34321;
//  const trigger = new Gpio(23, { mode: OUTPUT });
//  const echo = new Gpio(24, { mode: INPUT, alert: true });
//  trigger.digitalWrite(0); // Make sure trigger is low
//  function watchHCSR04() {
//    let startTick;
//    echo.on("alert", (level, tick) => {
//      if (level === 1) {
//        startTick = tick;
//      } else {
//        const endTick = tick;
//        const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
//        const distance = diff / 2 / MICROSECDONDS_PER_CM;
//        latestDistance = distance;
//        latestPoll = new Date().getTime();
//      }
//    });
//  }
//  watchHCSR04();
  // Trigger a distance measurement once per second
//  setInterval(
//    () => trigger.trigger(10, 1), // Set trigger high for 10 microseconds
//    250
//  );
  // check for errors
  setInterval(() => {
    if (new Date().getTime() - latestPoll > 1000) {
      latestDistance = null;
    }
  }, 1000);
} catch (error) {
  console.log("Error in ultrasonic");
  latestDistance = null;
}


///// const PigPio = require('pigpio').Gpio;

/*
 * Create distance sensor reading and save to variable dist. 
 */
// The number of microseconds it takes sound to travel 1cm at 20 degrees celcius.
///// const MICROSECONDS_PER_CM = 1e6/34321;
///// const trigger = new PigPio(23, {mode: PigPio.OUTPUT});
///// const echo = new PigPio(24, {mode: PigPio.INPUT, alert: true});
///// trigger.digitalWrite(0); // Make sure trigger is low

//var dist = 0; // store distance value.  TODO: UNCOMMENT THIS LINE FOR DEBUGGING.
///// function watchHCSR04(){
/////     let startTick;
/////     echo.on('alert', (level, tick) => {
/////       if (level == 1) {
/////         startTick = tick;
/////       } else {
/////         const endTick = tick;
/////         const diff = (endTick >> 0) - (startTick >> 0); // Unsigned 32 bit arithmetic
/////         dist = diff / 2 / MICROSECONDS_PER_CM;
/////       }
/////     });
/////   };
///// watchHCSR04();
// Trigger a distance measurement once per second
///// setInterval(() => {
/////     trigger.trigger(10, 1); // Set trigger high for 10 microseconds
///// }, 3000);

setInterval(() => { //TODO: UNCOMMENT THIS FUNCTION FOR DEBUGGING.
  latestDistance += 1.1
}, 1000)

export function printDistProof() {
  console.log("Sensor merger and distance sensor plugin has connection.")
}