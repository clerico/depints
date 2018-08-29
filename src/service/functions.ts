/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import "reflect-metadata";

import { ServiceMetadata } from "./ServiceMetadata";
import { Newable } from '../types/Newable';


/**
 *
 * @param target
 * @param metadata
 */
export function setServiceMetadata(serviceClass: Newable<any>, metadata: ServiceMetadata): void {
    Reflect.defineMetadata("indigen:service", metadata, serviceClass);
}

/**
 *
 * @param target
 */
export function getServiceMetadata(serviceClass: Newable<any>): ServiceMetadata | null {
    if (!Reflect.hasMetadata("indigen:service", serviceClass)) {
        return null;
    } else {
        return Reflect.getMetadata("indigen:service", serviceClass);
    }
}
