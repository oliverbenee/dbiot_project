'use strict'

const Gpio = require('onoff').Gpio;

/*
 * create magnetic sensor and store in variable occupied
 */
var occupied = 0;
const magSens = new Gpio(22, 'in', 'both')
magSens.watch((err, value) => {
    if(err) throw err
    occupied = 1 - value;
})

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on('SIGINT', () => {
    magSens.unexport();
    console.log('Closing program. Returning to console.')
    process.exit()
});

module.exports.occupied = occupied;