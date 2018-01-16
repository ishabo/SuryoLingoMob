import { create } from 'services/api';
import { ISignonFormData } from '../';

export const signin = (payload: ISignonFormData) => {
  debugger;
  const api = create();
  return api.post('/users/signin', payload);
};


