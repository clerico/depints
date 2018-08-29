import { LoggerInterface } from './LoggerInterface';

/**
 * 
 */
export class Logger1 implements LoggerInterface {
    constructor() {
        this.info("Logger1:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
