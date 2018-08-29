/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */

/* Annotations. */

export { Module } from "./annotations/Module";
export { Service } from "./annotations/Service";
export { Inject } from "./annotations/Inject";

/* Modules. */

export { ModuleConfig } from "./module/ModuleConfig";
export { ModuleMetadata } from "./module/ModuleMetadata";
export { Injector } from "./module/Injector";
export { getModuleMetadata, setModuleMetadata, getInjector, bootstrap } from "./module/functions";

/* Various types. */

export { Newable } from "./types/Newable";
export { GenericClassDecorator } from "./types/GenericClassDecorator";
