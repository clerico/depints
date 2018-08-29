import { ModuleConfig } from './ModuleConfig'
import { Injector } from './Injector'

/**
 *
 */
export interface ModuleMetadata {
  name: string
  config: ModuleConfig
  injector: Injector | null
}
