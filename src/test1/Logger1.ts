import { Injectable } from '../brocoli';


// @ Injectable("Logger1")
export class Logger {
    constructor() {
        this.info("Logger1:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
