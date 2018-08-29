/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import "reflect-metadata";

/**
 *
 * @param serviceName
 */
export function Inject(serviceName: string): ParameterDecorator {
    return (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        let serviceNames: string[];
        if (Reflect.hasMetadata("indigen:servicenames", target)) {
            serviceNames = Reflect.getMetadata("indigen:servicenames", target);
        } else {
            serviceNames = [];
            Reflect.defineMetadata(
                "indigen:servicenames",
                serviceNames,
                target
            );
        }
        serviceNames[parameterIndex] = serviceName;
    };
}
