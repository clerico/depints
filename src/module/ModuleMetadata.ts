import { ModuleConfig } from './ModuleConfig'

/**
 *
 */
export interface ModuleMetadata {
  name: string
  config: ModuleConfig
  injector: Injector | null
}
