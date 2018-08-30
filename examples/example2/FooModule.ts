/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Module, Inject } from "../../src/brocoli";

import { LoggerInterface } from './LoggerInterface';

/**
 * 
 */
@Module("foo", {
    dependencies: []
})
export class FooModule {
    constructor(
        @Inject("logger") logger: LoggerInterface,
        @Inject("message") message: string,
    ) {
        logger.info("FooModule::constructor()");
        logger.info("message", message);
    }
}
