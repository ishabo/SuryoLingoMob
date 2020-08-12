export const isApiResponse = (response) =>
  typeof response === 'object' && typeof response.status === 'number'
