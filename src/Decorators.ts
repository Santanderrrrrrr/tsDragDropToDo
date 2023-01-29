namespace App {
  //autobind decorator
  export function autoBind() {
    return function (
      _: any,
      _2: string | symbol,
      descriptor: PropertyDescriptor
    ) {
      const originalMethod = descriptor.value;
      const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
          const boundFn = originalMethod.bind(this);
          return boundFn;
        },
      };
      return adjustedDescriptor;
    };
  }
}