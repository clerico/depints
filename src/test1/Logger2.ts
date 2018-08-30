import { Injectable } from '../brocoli';

// @ Injectable("Logger2")
export class Logger {
    constructor() {
        this.info("Logger2:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
