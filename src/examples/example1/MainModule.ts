/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Module } from "../../brocoli";

import { Logger } from "./Logger2";
import { FooModule } from './FooModule';

/**
 * 
 */
@Module("main", {
    dependencies: [FooModule]
})
export class MainModule {
    constructor(logger: Logger) {
       logger.info("MainModule::constructor()");
    }
}
