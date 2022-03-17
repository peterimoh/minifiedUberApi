import { RequestHandler } from 'express';
import 'reflect-metadata';
import { MetaData } from './MetadataKeys';

export const use = (middleware: RequestHandler) => {
  return (target: any, key: string, desc: PropertyDecorator) => {
    const middlewares =
      Reflect.getMetadata(MetaData.middleware, target, key) || [];

    Reflect.defineMetadata(
      MetaData.middleware,
      [...middlewares, middleware],
      target,
      key
    );
  };
};
