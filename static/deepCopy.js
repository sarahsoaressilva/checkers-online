export function deepCopyFunction(obj) {
  if(typeof obj !== 'object' || obj === null) {
      return obj;
  }

  // if(obj instanceof Date) {
  //     return new Date(obj.getTime());
  // }

  if(obj instanceof Array) {
      return obj.reduce((arr, item, i) => {
          arr[i] = deepCopyFunction(item);
          return arr;
      }, []);
  }

  if(obj instanceof Object) {
      return Object.keys(obj).reduce((newObj, key) => {
          newObj[key] = deepCopyFunction(obj[key]);
          return newObj;
      }, {})
  }
}