"use strict";
exports.__esModule = true;
exports.patcher = exports.poster = exports.getter = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
var Methods_1 = require("./Methods");
var routeBinder = function (method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetaData.path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetaData.method, method, target, key);
        };
    };
};
exports.getter = routeBinder(Methods_1.Methods.get);
exports.poster = routeBinder(Methods_1.Methods.post);
exports.patcher = routeBinder(Methods_1.Methods.patch);
