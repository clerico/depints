import "reflect-metadata";

/**
 *
 * @param serviceName
 */
export function Inject(serviceName: string): ParameterDecorator {
  return (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number
  ) => {
    let serviceNames: string[]
    if (Reflect.hasMetadata('indigen:servicenames', target)) {
      serviceNames = Reflect.getMetadata('indigen:servicenames', target)
    } else {
      serviceNames = []
      Reflect.defineMetadata('indigen:servicenames', serviceNames, target)
    }
    serviceNames[parameterIndex] = serviceName
  }
}
