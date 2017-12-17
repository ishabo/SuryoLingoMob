import { create } from '../../api';

export const getLesson = (lessonId: string) => {
  const api = create();
  return api.get(`/questions?lesson=${lessonId}`);
};
