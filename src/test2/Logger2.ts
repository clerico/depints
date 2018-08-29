import { LoggerInterface } from './LoggerInterface';

/**
 * 
 */
export class Logger2 implements LoggerInterface {
    constructor() {
        this.info("Logger2:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
