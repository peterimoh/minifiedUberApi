"use strict";
exports.__esModule = true;
exports.RequestBodyValidator = void 0;
var MetadataKeys_1 = require("./MetadataKeys");
function RequestBodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetaData.validator, keys, target, key);
    };
}
exports.RequestBodyValidator = RequestBodyValidator;
