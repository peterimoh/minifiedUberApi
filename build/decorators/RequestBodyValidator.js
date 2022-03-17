"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestBodyValidator = void 0;
const MetadataKeys_1 = require("./MetadataKeys");
function RequestBodyValidator(...keys) {
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetaData.validator, keys, target, key);
    };
}
exports.RequestBodyValidator = RequestBodyValidator;
