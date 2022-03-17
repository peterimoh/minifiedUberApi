"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.use = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
const use = (middleware) => {
    return (target, key, desc) => {
        const middlewares = Reflect.getMetadata(MetadataKeys_1.MetaData.middleware, target, key) || [];
        Reflect.defineMetadata(MetadataKeys_1.MetaData.middleware, [...middlewares, middleware], target, key);
    };
};
exports.use = use;
