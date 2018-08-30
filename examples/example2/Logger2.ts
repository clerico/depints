/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
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
