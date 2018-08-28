import { create } from 'services/api';

export const fetchStatusSettings = () => {
  const api = create({
    baseURL: 'https://15xuph34sf.execute-api.us-east-1.amazonaws.com/production'
  });

  return api.get('app/settings');
};
