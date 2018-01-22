export const isApiResponse = response =>
  typeof response === 'object'
  && response.response
  && typeof response.response.status === 'number';

