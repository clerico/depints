/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Newable } from '../types/Newable';
import { GenericClassDecorator } from "../types/GenericClassDecorator";
import { ModuleConfig } from '../types/ModuleConfig';
import { ModuleMetadata } from '../types/ModuleMetadata';
import { setInjectableMetadata, getInjectableMetadata } from './Injectable';

/**
 * 
 * @param name 
 * @param config 
 */
export function Module<T = any>(
    name?: string,
    config: ModuleConfig<T> = {}
): GenericClassDecorator<Newable<T>> {
    return (moduleClass: Newable<T>): void => {
        const metadata = getModuleMetadata(moduleClass, false, true);
        if ( metadata === null ) throw new Error("never reachs");
        if ( name !== undefined ) metadata.name = name;
        metadata.config = config;

        // Check dependencies.
        // TODO: in boostrap?
        if (config.dependencies !== undefined) {
            config.dependencies.forEach((dependency: Newable<any>) => getModuleMetadata(dependency, true));
        }
    };
}

/**
 * 
 * @param moduleClass 
 * @param metadata 
 */
export function setModuleMetadata<T>(moduleClass: Newable<T>, metadata: ModuleMetadata<T>): void {
    setInjectableMetadata(moduleClass, metadata);
}

/**
 * 
 * @param moduleClass 
 * @param throwErrorIfNotExist 
 */
export function getModuleMetadata<T>(moduleClass: Newable<T>, throwErrorIfNotExist: boolean = true, create: boolean = true): ModuleMetadata<T> | null {
    const metadata = getInjectableMetadata(moduleClass, false);
    if (metadata !== null) return metadata;
    if ( throwErrorIfNotExist ) {
        throw new Error(`${moduleClass} does not seem to be a module class, use "Module" annotation`);
    }
    if (create) {
        const metadata = createMetadata(moduleClass, undefined, {});
        setModuleMetadata(moduleClass, metadata);
        return metadata;
    } else return null;
}

// Private.
function createMetadata<T>(moduleClass: Newable<T>, name: string | undefined, config: ModuleConfig<T>): ModuleMetadata<T> {
    if ( name === undefined ) name = moduleClass.name;
    return { name, config, toInject: {} };
}