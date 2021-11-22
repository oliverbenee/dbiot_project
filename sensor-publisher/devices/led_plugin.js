'use strict'

/*
 * LED plugin. Configured to be plugged into GPIO 4.
 */ 

import { Gpio } from "onoff";
var ledOut;

const led = new Gpio("4", "out");

export function toggleLed(){
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

export function printLedProof() {
    console.log("led go BRRRRRRRRR")
    setTimeout(() => {toggleLed()}, 500);
    setTimeout(() => {toggleLed()}, 1000);
    setTimeout(() => {toggleLed()}, 1500);
    setTimeout(() => {toggleLed()}, 2000);
    setTimeout(() => {toggleLed()}, 2500);
    setTimeout(() => {toggleLed()}, 3000);
}