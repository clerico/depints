import { Module, Service, bootstrap, Inject } from "../brocoli";

import { LoggerInterface } from './LoggerInterface';

/**
 * 
 */
@Module("foo", {
    dependencies: []
})
export class FooModule {
    constructor(
        @Inject("logger") logger: LoggerInterface
    ) {
        logger.info("FooModule::constructor()");
    }
}
