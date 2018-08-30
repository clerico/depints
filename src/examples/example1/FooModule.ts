/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Module } from "../../depints";

import { Logger } from "./Logger1";

/**
 * 
 */
@Module("foo", {
    dependencies: []
})
export class FooModule {
    constructor(logger: Logger) {
        logger.info("FooModule::constructor()");
    }
}
