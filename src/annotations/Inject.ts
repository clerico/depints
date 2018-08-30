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
import { getInjectableMetadata } from './Injectable';
import { GenericParameterDecorator } from '../types/GenericParameterDecorator';

/**
 *
 * @param injectableName
 */
export function Inject(parameterInjectableName: string): GenericParameterDecorator<Newable<any>> {
    return (
        injectableClass: Newable<any>,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        const metadata = getInjectableMetadata(injectableClass, true);
        if ( metadata === null ) throw new Error("never reachs");
        metadata.toInject[parameterIndex] = parameterInjectableName;
    };
}
