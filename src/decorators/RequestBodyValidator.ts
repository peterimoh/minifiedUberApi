import { MetaData } from "./MetadataKeys";

export function RequestBodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetaData.validator, keys, target, key)
  }
}