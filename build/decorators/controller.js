"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const AppRouter_1 = require("../AppRouter");
const MetadataKeys_1 = require("./MetadataKeys");
function bodyValidators(keys) {
    return (req, res, next) => {
        if (!req.body) {
            res.status(422).send("Missing Fields");
            return;
        }
        for (let key of keys) {
            if (!req.body[key]) {
                res.status(422).send(`${key} is missing`);
            }
        }
        next();
    };
}
const controller = (routePrefix) => {
    return (target) => {
        const router = AppRouter_1.AppRouter.getInstance();
        for (let key of Object.getOwnPropertyNames(target.prototype)) {
            const routehandler = target.prototype[key];
            const path = Reflect.getMetadata(MetadataKeys_1.MetaData.path, target.prototype, key);
            const method = Reflect.getMetadata(MetadataKeys_1.MetaData.method, target.prototype, key);
            const middleware = Reflect.getMetadata(MetadataKeys_1.MetaData.middleware, target.prototype, key) || [];
            const requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetaData.validator, target.prototype, key) || [];
            const validator = bodyValidators(requiredBodyProps);
            if (path) {
                router[method](`${routePrefix}${path}`, ...middleware, validator, routehandler);
            }
        }
    };
};
exports.controller = controller;
