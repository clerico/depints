/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */
import { Newable } from '../types/Newable';
import { GenericClassDecorator } from "../types/GenericClassDecorator";
import { ServiceConfig } from '../service/ServiceConfig';
import { setServiceMetadata } from '../service/functions';

/**
 * 
 * @param name 
 * @param config 
 */
export function Service(
  name: string,
  config: ServiceConfig = {}
): GenericClassDecorator<Newable<any>> {
  return (serviceClass: Newable<any>): void => {
      // Add metadata.
      setServiceMetadata(serviceClass, { name, config });
  };
}
