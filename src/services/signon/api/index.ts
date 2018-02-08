import { create } from 'services/api';
import { ISignonFormData } from '../';

export const signin = (payload: ISignonFormData) => {
  const api = create();
  return api.post('/auth/signin', payload);
};

export const recoverPassword = (email: string) => {
  const api = create();
  return api.post('/auth/recover-password', { email });
};
