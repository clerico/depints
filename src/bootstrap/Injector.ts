/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import "reflect-metadata";

import { Newable } from '../types/Newable';
import { InjectableConfig } from '../types/InjectableConfig';
import { getInjectableMetadata } from '../annotations/Injectable';

/**
 *
 */
export class Injector<T = any> {

    private injectableConfigs: { [name: string]: InjectableConfig<T> } = {};
    private injectableInstances: { [name: string]: T } = {};

    /**
     * 
     * @param injectableConfigs 
     */
    declare(injectableConfigs: { [name: string]: InjectableConfig<T> }): Injector<T> {
        this.injectableConfigs = { ...injectableConfigs, ...this.injectableConfigs };
        return this;
    }

    /**
     * 
     * @param newable 
     * @param injectableName 
     */
    resolve<S extends T>(newable?: Newable<T>, injectableName?: string): S {
        let config: InjectableConfig = { newable };

        // Guess a name for this injectable.
        if (injectableName === undefined) {
            if ( newable === undefined ) throw new Error("fail to resolve");
            const metadata = getInjectableMetadata(newable);
            if ( metadata !== null ) {
                injectableName = metadata.name;
                config = { ...metadata.config, ...config };
            } else {
                injectableName = newable.name; // TODO: in this case, compare prototype...
            }
        }

        // An instance already exists?
        let instance = this.injectableInstances[injectableName] as S;
        if ( instance !== undefined ) {
            return instance;
        }

        // Finish to resolve config.
        if ( this.injectableConfigs[injectableName] !== undefined ) {
            config = this.injectableConfigs[injectableName];
        }

        // Config has a instance? (ie no needs to instanciate)
        instance = config.instance;
        if ( instance !== undefined ) {
            this.injectableInstances[injectableName] = instance;
            return instance;
        }

        // Resolve constructor for the newable.
        if ( config.newable === undefined ) throw new Error("fail to resolve");
        const metadata = getInjectableMetadata(config.newable, true);
        if ( metadata === null ) throw new Error("never reachs");
        const parameters = Reflect.getMetadata("design:paramtypes", config.newable) || []; // TODO: put in metadata object.
        const injections = parameters.map((parameter: any, parameterIndex: number) =>
            this.resolve(parameter, metadata.toInject[parameterIndex])
        );

        // Create instance.
        instance = new config.newable(...injections);
        this.injectableInstances[injectableName] = instance;
        return instance;
    }
}
