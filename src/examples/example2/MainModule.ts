/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Depints project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Module, Inject } from "../../depints";

import { FooModule } from './FooModule';
import { LoggerInterface } from './LoggerInterface';
import { Logger1 } from './Logger1';

/**
 * 
 */
@Module("main", {
    dependencies: [FooModule],
    injectables: {
        "logger": { newable: Logger1 },
        "message": { instance: "Hello World !!!" }
    }
})
export class MainModule {
    constructor(
        @Inject("logger") logger: LoggerInterface
    ) {
       logger.info("MainModule::constructor()");
    }
}
