import "reflect-metadata";

const response: ParameterDecorator = (
  target: Object,
  propertyKey: string | symbol,
  parameterIndex: number
) => {
  Reflect.defineMetadata("response", parameterIndex, target, propertyKey);
};

const get: (path: string) => MethodDecorator = (path) => {
  return (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    let originMethod = descriptor.value;
    let index = Reflect.getMetadata("response", target, propertyKey);
    descriptor.value = function () {
      arguments[index] = { data: "返回值" };
      let arr = [];
      for (const eindex in arguments) {
        if (Object.prototype.hasOwnProperty.call(arguments, eindex)) {
          const element = arguments[eindex];
          arr.push(element);
        }
      }
      originMethod(...arr);
    };
  };
};

class HttpReq {
  @get("/getAllData")
  getAllData(request: {}, @response res?: {}) {
    console.log(res);
  }
}

let http = new HttpReq();
http.getAllData({ data: "requestBody" });
