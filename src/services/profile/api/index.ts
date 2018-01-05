import { create } from '../../api';
import { IProfilePayload } from '../';
import qs from 'qs';


export const createProfile = (payload?: IProfilePayload) => {
  const api = create();
  return api.post(buildUrl(payload));
};

export const updateProfile = (payload: IProfilePayload) => {
  const api = create();
  return api.put(buildUrl(payload));
};

const buildUrl = (payload?: IProfilePayload) =>
  `/users${payload ? '?' + qs.stringify(payload) : ''}`;
