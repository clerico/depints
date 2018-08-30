/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Newable } from '../types/Newable';
import { InjectableConfig } from './InjectableConfig';

/**
 *
 */
export interface ModuleConfig<T = any> extends InjectableConfig<T> {
    dependencies?: Newable<T>[];
    injectables?: { [name: string]: InjectableConfig };
}
