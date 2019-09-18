import { create } from '@sl/services/api';
import config from '@sl/config';

export const getSettings = () => {
  const api = create({
    baseURL: config.lambdaHost
  });

  return api.get('/app/settings');
};
