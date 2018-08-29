
import { GenericClassDecorator } from '../types/GenericClassDecorator'
import { ModuleConfig } from '../module/ModuleConfig'
import { setModuleMetadata, getModuleMetadata } from '../module'

/**
 *
 * @param name
 * @param config
 */
export function Module(
  name: string,
  config: ModuleConfig = {}
): GenericClassDecorator<Newable<any>> {
  return (moduleClass: Newable<any>): void => {
    // Add metadata.
    setModuleMetadata(moduleClass, { name, config, injector: null })

    // Check dependencies.
    if (config.dependencies !== undefined) {
      config.dependencies.forEach((dependency: Newable<any>) =>
        getModuleMetadata(moduleClass)
      )
    }
  }
}
