import "reflect-metadata";

/**
 *
 */
export class Injector {
    private _services: { [name: string]: any } = {};

    constructor(public moduleClass: Newable<any>) {
        // Nothing to do.
    }

    resolve<T>(target: Newable<any>, serviceName?: string): T {
        if (serviceName === undefined) serviceName = target.name;

        let service = this._services[serviceName];
        if (service !== undefined) return service;

        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const serviceNames =
            Reflect.getMetadata("indigen:servicenames", target) || [];
        const injections = tokens.map((token: any, parameterIndex: number) =>
            this.resolve(token, serviceNames[parameterIndex])
        );

        service = new target(...injections);
        this._services[serviceName] = service;

        return service;
    }
}
