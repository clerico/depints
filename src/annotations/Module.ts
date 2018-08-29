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
import { ModuleConfig } from "../module/ModuleConfig";
import { setModuleMetadata, getModuleMetadata } from "../module/functions";

/**
 *
 * @param name
 * @param config
 */
export function Module(
    name: string,
    config: ModuleConfig = {}
): GenericClassDecorator<Newable<any>> {
    return (moduleClass: Newable<any>): void => {
        // Add metadata.
        setModuleMetadata(moduleClass, { name, config, injector: null });

        // Check dependencies.
        if (config.dependencies !== undefined) {
            config.dependencies.forEach((dependency: Newable<any>) =>
                getModuleMetadata(moduleClass)
            );
        }
    };
}
