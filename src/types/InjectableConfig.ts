/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Depints project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Newable } from './Newable';

/**
 * 
 */
export interface InjectableConfig<T = any> {
    newable?: Newable<T>;
    instance?: T;
}
