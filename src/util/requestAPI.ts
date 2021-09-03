export const requestAPI = (promise: any) => promise
  .then( (result: any) => [result])
  .catch( (error: any) => [error])
