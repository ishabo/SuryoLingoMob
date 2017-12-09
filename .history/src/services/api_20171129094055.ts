import { create } from 'apisauce';
import config from '../config';

export const api = create({
  baseURL: config.apiHost,
  headers: { Accept: 'application/json' },
});