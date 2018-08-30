/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Depints project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { ModuleConfig } from "./ModuleConfig";
import { InjectableMetadata } from './InjectableMetadata';

/**
 *
 */
export interface ModuleMetadata<T = any> extends InjectableMetadata<T, ModuleConfig<T>> {
    // Nothing to add.
}
