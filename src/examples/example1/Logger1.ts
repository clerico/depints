/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Depints project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */

/**
 * 
 */
export class Logger {
    constructor() {
        this.info("Logger1:constructor()");
    }
    info(...args: any[]) {
        console.log(...args);
    }
}
