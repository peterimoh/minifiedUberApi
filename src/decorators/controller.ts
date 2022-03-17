import { NextFunction, Request, RequestHandler, Response } from 'express';
import 'reflect-metadata';

import { AppRouter } from '../AppRouter';
import { MetaData } from './MetadataKeys';
import { Methods } from './Methods';

function bodyValidators(keys: string): RequestHandler{
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
      res.status(422).send("Missing Fields");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`${key} is missing`)
      }
    }
    next();
  }
}


export const controller = (routePrefix: string) => {
  return (target: Function)=>{
    const router = AppRouter.getInstance();
    for (let key of Object.getOwnPropertyNames(target.prototype)) {
      const routehandler = target.prototype[key];

      const path = Reflect.getMetadata(MetaData.path, target.prototype, key);

      const method: Methods = Reflect.getMetadata(MetaData.method, target.prototype, key);

      const middleware = Reflect.getMetadata(MetaData.middleware, target.prototype, key) || [];

      const requiredBodyProps = Reflect.getMetadata(MetaData.validator, target.prototype, key) || [];

      const validator = bodyValidators(requiredBodyProps);
      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middleware,
          validator,
          routehandler
        )
      }
    }
  }
}