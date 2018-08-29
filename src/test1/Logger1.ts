import { Service } from '../annotations/Service';


@Service("Logger1")
export class Logger {
    constructor() {
        this.info("Logger1:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
