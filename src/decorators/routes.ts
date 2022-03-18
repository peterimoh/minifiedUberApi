import { RequestHandler } from 'express';
import 'reflect-metadata';

import { MetaData } from './MetadataKeys';
import { Methods } from './Methods';

interface RouteHandlerDescriptor extends PropertyDescriptor {
  value?: RequestHandler;
}

const routeBinder = (method: string) => {
  return (path: string): Function => {
    return (target: any, key: string, desc: RouteHandlerDescriptor) => {
      Reflect.defineMetadata(MetaData.path, path, target, key);
      Reflect.defineMetadata(MetaData.method, method, target, key);
    };
  };
};

export const getter = routeBinder(Methods.get);
export const poster = routeBinder(Methods.post);
export const patcher = routeBinder(Methods.patch);
export const putter = routeBinder(Methods.put);
