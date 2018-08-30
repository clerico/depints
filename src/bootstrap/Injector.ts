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

    private injectableConfigByName: { [name: string]: InjectableConfig<T> } = {};
    private injectableInstanceByName: { [name: string]: T } = {};
    private injectableInstanceBags: { newable: Newable<T>, instance: T }[] = [];

    /**
     * 
     * @param injectableConfigByName 
     */
    declare(injectableConfigByName: { [name: string]: InjectableConfig<T> }): Injector<T> {
        this.injectableConfigByName = { ...injectableConfigByName, ...this.injectableConfigByName };
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
            }
        }

        // An instance already exists?
        if ( injectableName !== undefined ) {
            const instance = this.injectableInstanceByName[injectableName] as S;
            if ( instance !== undefined ) return instance;
        } else {
            const bag = this.injectableInstanceBags.find(bag => bag.newable === newable);
            if ( bag !== undefined ) return bag.instance as S;
        }

        // Finish to resolve config.
        if ( injectableName !== undefined ) {
            if ( this.injectableConfigByName[injectableName] !== undefined ) {
                config = this.injectableConfigByName[injectableName];
            }
        }

        // Config has a instance? (ie no needs to instanciate)
        if ( config.instance !== undefined ) {
            if ( injectableName !== undefined ) {
                this.injectableInstanceByName[injectableName] = config.instance;
            } else {
                if ( config.newable === undefined ) throw new Error("fail to resolve");
                const bag = { newable: config.newable, instance: config.instance };
                this.injectableInstanceBags.push(bag);
            }
            return config.instance;
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
        const instance = new config.newable(...injections);
        if ( injectableName !== undefined ) {
            this.injectableInstanceByName[injectableName] = instance;
        } else {
            const bag = { newable: config.newable, instance };
            this.injectableInstanceBags.push(bag);
        }
        return instance;
    }
}
