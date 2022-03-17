"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patcher = exports.poster = exports.getter = void 0;
require("reflect-metadata");
const MetadataKeys_1 = require("./MetadataKeys");
const Methods_1 = require("./Methods");
const routeBinder = (method) => {
    return (path) => {
        return (target, key, desc) => {
            Reflect.defineMetadata(MetadataKeys_1.MetaData.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetaData.method, method, target, key);
        };
    };
};
exports.getter = routeBinder(Methods_1.Methods.get);
exports.poster = routeBinder(Methods_1.Methods.post);
exports.patcher = routeBinder(Methods_1.Methods.patch);
