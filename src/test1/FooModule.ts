import { Module } from "../brocoli";

import { Logger } from "./Logger1";

@Module("foo", {
    dependencies: []
})
export class FooModule {
    constructor(logger: Logger) {
        logger.info("FooModule::constructor()");
    }
}
