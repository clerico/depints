/**
 * Copyright (c) 2018 Jérôme CLERICO
 * This file is part of "Brocoli project" which is released under MIT Licence.
 * See file LICENCE for full license details.
 * 
 * Author(s):
 *   - Jérôme CLERICO <jerome.clerico@indigen.com>
 */

/* Annotations. */

export { Injectable, getInjectableMetadata } from "./annotations/Injectable";
export { Module, getModuleMetadata } from "./annotations/Module";
export { Inject } from "./annotations/Inject";

/* Types. */

export { Newable } from "./types/Newable";
export { GenericClassDecorator } from "./types/GenericClassDecorator";
export { GenericParameterDecorator } from "./types/GenericParameterDecorator";
export { InjectableConfig } from "./types/InjectableConfig";
export { InjectableMetadata } from "./types/InjectableMetadata";
export { ModuleConfig } from "./types/ModuleConfig";
export { ModuleMetadata } from "./types/ModuleMetadata";

/* Bootstraping. */

export { bootstrap } from "./bootstrap/bootstrap";
export { Injector } from "./bootstrap/Injector";
