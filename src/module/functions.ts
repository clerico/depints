import "reflect-metadata";

import { ModuleMetadata } from "./ModuleMetadata";
import { Injector } from "./Injector";
import { Newable } from '../types/Newable';


/**
 *
 * @param target
 * @param metadata
 */
export function setModuleMetadata(moduleClass: Newable<any>, metadata: ModuleMetadata): void {
    Reflect.defineMetadata("indigen:module", metadata, moduleClass);
}

/**
 *
 * @param target
 */
export function getModuleMetadata(moduleClass: Newable<any>): ModuleMetadata {
    if (!Reflect.hasMetadata("indigen:module", moduleClass)) {
        throw new Error(
            `${moduleClass} does not seem to be a module class, use "Module" annotation`
        );
    }
    return Reflect.getMetadata("indigen:module", moduleClass);
}

/**
 *
 * @param target
 */
export function getInjector(moduleClass: Newable<any>): Injector {
    const metadata = getModuleMetadata(moduleClass);
    if (metadata.injector === null) {
        throw new Error(`${moduleClass} has not been bootstrapped`);
    }
    return metadata.injector;
}

/**
 *
 * @param target
 */
export function bootstrap(moduleClass: Newable<any>): Injector {
    const metadata = getModuleMetadata(moduleClass);
    if (metadata.injector !== null) {
        throw new Error(`${moduleClass} has already been bootstrapped`);
    }
    metadata.injector = new Injector(moduleClass);

    // TODO for dependencies.

    return metadata.injector;
}
