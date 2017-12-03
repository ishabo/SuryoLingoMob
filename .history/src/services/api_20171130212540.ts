import { create } from 'apisauce';
import config from '../config';

let userToken: string = null;

export const getUserToken = () => {
  if (!userToken) {
    throw new Error('No token found');
  }
  return userToken;
};

export const setToken = (token: string) => {
  userToken = token;
};

export const createApi = () => {
  const api = create({
    baseURL: config.apiHost,
    headers: {
      Accept: 'application/json',
      Authorization: 'Token token=BJpL8rwd3wkMhqg1zoEjuAtt',
    },
  });
};

