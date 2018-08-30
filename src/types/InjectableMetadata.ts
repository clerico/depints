/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */

import { InjectableConfig } from "./InjectableConfig";

/**
 *
 */
export interface InjectableMetadata<T = any, C extends InjectableConfig<T> = InjectableConfig<T>> {
    name: string;
    config: C;
    toInject: { [constructorParameterIndex: number]: string }
}
