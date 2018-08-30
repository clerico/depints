/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 *
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Newable } from "../types/Newable";
import { GenericClassDecorator } from "../types/GenericClassDecorator";
import { InjectableConfig } from "../types/InjectableConfig";
import { InjectableMetadata } from "../types/InjectableMetadata";

/**
 *
 * @param name
 * @param config
 */
export function Injectable<T = any>(
    name?: string,
    config: InjectableConfig<T> = {}
): GenericClassDecorator<Newable<T>> {
    return (injectableClass: Newable<T>): void => {
        const metadata = getInjectableMetadata(injectableClass, true);
        if ( metadata === null ) throw new Error("never reachs");
        if ( name !== undefined ) metadata.name = name;
        metadata.config = config;
    };
}

/**
 *
 * @param injectableClass
 * @param metadata
 */
export function setInjectableMetadata<T>(injectableClass: Newable<T>, metadata: InjectableMetadata<T>): void {
    Reflect.defineMetadata("brocoli:injectable", metadata, injectableClass);
}

/**
 *
 * @param target
 */
export function getInjectableMetadata<T>(injectableClass: Newable<T>, create: boolean = false): InjectableMetadata<T> | null {
    if (!Reflect.hasMetadata("brocoli:injectable", injectableClass)) {
        if (create) {
            const metadata = createMetadata(injectableClass, undefined, {});
            setInjectableMetadata(injectableClass, metadata);
            return metadata;
        } else return null;
    } else {
        return Reflect.getMetadata("brocoli:injectable", injectableClass);
    }
}

// Private.
function createMetadata<T>(injectableClass: Newable<T>, name: string | undefined, config: InjectableConfig<T>): InjectableMetadata<T> {
    if (name === undefined) name = injectableClass.name;
    return { name, config, toInject: {} };
}
