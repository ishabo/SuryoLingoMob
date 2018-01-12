import { create } from 'services/api';
import { ISignonFormData } from '../';

export const signin = (payload: ISignonFormData) => {
  const api = create();
  return api.post('/users/signin', payload);
};


