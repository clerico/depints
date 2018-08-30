/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Newable } from '../types/Newable';
import { Injector } from './Injector';
import { getModuleMetadata } from '../annotations/Module';

 /**
  * 
  * @param moduleClass 
  */
export function bootstrap<T = any>(moduleClass: Newable<T>): Injector {
    const injector = new Injector();

    const runner = (_moduleClass: Newable<T>) => {
        const metadata = getModuleMetadata(_moduleClass, true);
        if ( metadata === null ) throw new Error("never reachs");
        if ( metadata.config.injectables !== undefined ) {
            injector.declare(metadata.config.injectables);
        }
        if ( metadata.config.dependencies !== undefined ) {
            metadata.config.dependencies.forEach(runner);
        }

        injector.resolve(_moduleClass);
    };
    runner(moduleClass);

    return injector;
}


