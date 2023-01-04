export const PATH_METADATA = "path";
export const METHOD_METADATA = "method";
export type RequestMethod = "get"|"post"|"put"|"delete"|"patch"
export type ParamDecoratorList =  "Param" | "Body" | "Query" | "Req" | "Res"
export function Controller(prePath: string): ClassDecorator {
  return (target: Function) => {
    Reflect.defineMetadata(PATH_METADATA, prePath, target);
  };
}
export function createMethodDecorator(method: RequestMethod) {
  return (path: string): MethodDecorator => {
    return (target: Object, propertyKey: string | symbol, descriptor: any) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    };
  };
}

export const Get = createMethodDecorator("get");
export const Post = createMethodDecorator("post");
export const Put = createMethodDecorator("put");
export const Patch = createMethodDecorator("patch");
export const Delete = createMethodDecorator("delete");

export function createParameterDecorator(DecName:ParamDecoratorList) {
  // TODO
  return (DecParam?: any): ParameterDecorator => {
    // TODO
    return (target:any/** 传入一个明确的类型 */, propertyKey, parameterIndex) => {
      console.log('DecName :>> ',DecName);
      console.log('target :>> ',target);
      console.log('propertyKey :>> ',propertyKey);
      console.log('parameterIndex :>> ',parameterIndex);
      // 定义参数装饰器的位置
      Reflect.defineMetadata(DecName,parameterIndex,target[propertyKey]);
      // 定义装饰器的名字
      // Reflect.defineMetadata()
      console.log(target[propertyKey].toString());
      
    };
  };
}

export const Req = createParameterDecorator('Req');
export const Res = createParameterDecorator('Res');
export const Param = createParameterDecorator('Param');
export const Body = createParameterDecorator('Body');
export const Query = createParameterDecorator('Query');