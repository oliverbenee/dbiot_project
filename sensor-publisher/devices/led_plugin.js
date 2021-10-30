'use strict'

/*
 * LED plugin. Configured to be plugged into GPIO 4.
 */ 

const Gpio = require('onoff').Gpio;
var ledOut;

const led = new Gpio("4", "out");

exports.toggleLed = function(){
    var nv;
    if(led.readSync() == 0){
        led.writeSync(1)
        nv = "1"
    } else {
        led.writeSync(0)
        nv = "0"
    }
}

process.on("SIGINT", () => {
    led.unexport();
    process.exit();
})

exports.printProof = () => {
    console.log("led go BRRRRRRRRR")
    for (let index = 0; index < 3; index++) {
        setTimeout(this.toggleLed(), 500);
        setTimeout(this.toggleLed(), 1000);
    };
}


module.exports.led = led;