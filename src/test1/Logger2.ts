import { Service } from '../annotations/Service';

@Service("Logger2")
export class Logger {
    constructor() {
        this.info("Logger2:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
