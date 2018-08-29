/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import "reflect-metadata";

import { ModuleMetadata } from "./ModuleMetadata";
import { Injector } from "./Injector";
import { Newable } from '../types/Newable';
import { Logger2 } from '../test2/Logger2';


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
    /*
    const metadata = getModuleMetadata(moduleClass);
    if (metadata.injector !== null) {
        throw new Error(`${moduleClass} has already been bootstrapped`);
    }
    */

    const injector = new Injector(moduleClass);

    injector.resolve(Logger2, "logger");

    const runner = (_moduleClass: Newable<any>) => {
        const metadata = getModuleMetadata(_moduleClass);
        if ( metadata.config.dependencies !== undefined ) {
            metadata.config.dependencies.forEach(runner);
        }
        injector.resolve(_moduleClass);
    };

    runner(moduleClass);

    /*
    if ( metadata.config.dependencies !== undefined ) {
        // TODO
        metadata.config.dependencies.forEach()
    }

    // TODO for dependencies.
    const moduleInstance = metadata.injector.resolve(moduleClass);

    return metadata.injector;
    */

    return injector;
}


