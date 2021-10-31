'use strict'

/*
 * LED plugin. Configured to be plugged into GPIO 4.
 */ 

import { Gpio } from "onoff";
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

export function setLedState(state){
    led.writeSync(state)
}

process.on("SIGINT", () => {
    led.unexport();
    process.exit();
})

exports.printProof = () => {
    console.log("led go BRRRRRRRRR")
    setTimeout(() => {this.toggleLed()}, 500);
    setTimeout(() => {this.toggleLed()}, 1000);
    setTimeout(() => {this.toggleLed()}, 1500);
    setTimeout(() => {this.toggleLed()}, 2000);
    setTimeout(() => {this.toggleLed()}, 2500);
    setTimeout(() => {this.toggleLed()}, 3000);
}


module.exports.led = led;