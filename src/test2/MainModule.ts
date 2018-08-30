import { Module, Inject } from "../brocoli";

import { FooModule } from './FooModule';
import { LoggerInterface } from './LoggerInterface';
import { Logger1 } from './Logger1';

/**
 * 
 */
@Module("main", {
    dependencies: [FooModule],
    injectables: {
        "logger": { newable: Logger1 }
    }
})
export class MainModule {
    constructor(
        @Inject("logger") logger: LoggerInterface
    ) {
       logger.info("MainModule::constructor()");
    }
}
