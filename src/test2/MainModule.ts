import { Module, Service, bootstrap, Inject } from "../brocoli";

import { FooModule } from './FooModule';
import { LoggerInterface } from './LoggerInterface';

/**
 * 
 */
@Module("main", {
    dependencies: [FooModule]
})
export class MainModule {
    constructor(
        @Inject("logger") logger: LoggerInterface
    ) {
       logger.info("MainModule::constructor()");
    }
}
