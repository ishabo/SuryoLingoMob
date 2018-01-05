import { create } from '../../api';

export const getDictionaries = (courseId: string) => {
  const api = create();
  return api.get(`/dictionaries?course=${courseId}`);
};
