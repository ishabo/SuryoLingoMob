import { create } from 'services/api';
import config from 'config';

export const getSettings = () => {
  const api = create({
    baseURL: config.lambdaHost
  });

  return api.get('/app/settings');
};
