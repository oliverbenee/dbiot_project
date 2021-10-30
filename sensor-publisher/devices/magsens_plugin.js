'use strict'

const Gpio = require('onoff').Gpio;
console.log("magsens plugin is running!");

/*
 * create magnetic sensor and store in variable occupied
 */
var occupied = 0;

setInterval(() => {occupied += 1}, 3000)

const magSens = new Gpio(22, 'in', 'both')
magSens.watch((err, value) => {
    if(err) throw err
    console.log("VALUE CHANGE IN MAGSENS")
    occupied = 1 - value;
})

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on('SIGINT', () => {
    magSens.unexport();
    console.log('Closing program. Returning to console.')
    process.exit()
});

module.exports.occupied = occupied;