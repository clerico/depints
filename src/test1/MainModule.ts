import { Module } from "../brocoli";

import { Logger } from "./Logger2";
import { FooModule } from './FooModule';

@Module("main", {
    dependencies: [FooModule]
})
export class MainModule {
    constructor(logger: Logger) {
       logger.info("MainModule::constructor()");
    }
}
