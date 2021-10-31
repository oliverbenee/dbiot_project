'use strict'

const Gpio = require('onoff').Gpio;

/*
 * create magnetic sensor and store in variable occupied
 */
var occupied = 0;

const magSens = new Gpio(22, 'in', 'both')
magSens.watch((err, value) => {
    if(err) throw err
    console.log("VALUE CHANGE IN MAGSENS")
    console.log("old occupied value: " + occupied)
    occupied = 1 - value;
    console.log("new occupied value: " + occupied)
})

export function getOccupied() {
    return occupied;
}

// Listen to the event triggered on CTRL+C, if it get triggered, Cleanly close the GPIO pin before exiting
process.on('SIGINT', () => {
    magSens.unexport();
    console.log('Closing program. Returning to console.')
    process.exit()
});

export function printMagProof() {
    console.log("Sensor merger and magnetic sensor plugin has connection.")
}