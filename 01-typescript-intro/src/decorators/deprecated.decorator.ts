
// Decorador que marca un método de una clase como deprecado y muestra el mensaje que le pasemos como un aviso.

export const Deprecated = (deprecationReason: string) => {
    return (target: any, memberName: string, propertyDescriptor: PropertyDescriptor) => {
      //console.log({target, memberName, propertyDescriptor})
      return {
        get() {
          const wrapperFn = (...args: any[]) => {
            console.warn(`Method ${ memberName } is deprecated with reason: ${ deprecationReason }`);
            // Llama al método propiamente con sus argumentos.
            propertyDescriptor.value.apply(this, args); 
          };
          return wrapperFn;
        }
      };
    };
};