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
import { getServiceMetadata } from '../service/functions';

/**
 *
 */
export class Injector {
    private _services: { [name: string]: any } = {};

    constructor(public moduleClass: Newable<any>) {
        // Nothing to do.
    }

    resolve<T>(target: Newable<any>, serviceName?: string): T {
        if (serviceName === undefined) {
            const metadata = getServiceMetadata(target);
            if ( metadata !== null ) {
                serviceName = metadata.name;
            } else {
                serviceName = target.name; // TODO: in this case, compare prototype...
            }
        }
            
        let service = this._services[serviceName];
        if (service !== undefined) return service;

        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const serviceNames =
            Reflect.getMetadata("indigen:servicenames", target) || [];
        const injections = tokens.map((token: any, parameterIndex: number) =>
            this.resolve(token, serviceNames[parameterIndex])
        );

        service = new target(...injections);
        if ( serviceName !== undefined ) {
            this._services[serviceName] = service;
        } // TODO: why ?

        return service;
    }
}
