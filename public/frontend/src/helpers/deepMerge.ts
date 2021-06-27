export const deepMerge = (target: any, source: { [x: string]: any; path?: string; exact?: boolean; }) => {
  for (let key of Object.keys(source)) {
    if (
      source[key] instanceof Object &&
      !source[key].hasOwnProperty("length")
    ) {
      Object.assign(source[key], deepMerge(target[key] || {}, source[key])); // unimos tudo no target com recursividade
    }
  }

  Object.assign(target || {}, source);

  return target;
};