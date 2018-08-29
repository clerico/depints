import { Newable } from '../types/Newable';
import { GenericClassDecorator } from "../types/GenericClassDecorator";

/**
 *
 */
export function Service(): GenericClassDecorator<Newable<any>> {
    return (target: Newable<any>): void => {
        // Nothing to do.
    };
}
