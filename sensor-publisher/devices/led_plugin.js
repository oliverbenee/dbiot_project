'use strict'

/*
 * LED plugin. Configured to be plugged into GPIO 4.
 */ 

const Gpio = require('onoff').Gpio;
var ledOut;

const led = new Gpio("4", "out");

function toggleLed(){
    var nv;
    if(led.readSync() == 0){
        led.writeSync(1)
        nv = "1"
    } else {
        led.writeSync(0)
        nv = "0"
    }
    publish("", nv) // TODO: publish where?
}

process.on("SIGINT", () => {
    led.unexport();
    process.exit();
})

module.exports.led = led;