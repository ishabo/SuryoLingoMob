import { create } from '../../api';
import { ILessonToSync } from 'services/progress';

export const getLesson = (lessonId: string) =>
  create().get(`/questions?lesson=${lessonId}`);

export const syncFinishedLessons = (lessonsToSync: ILessonToSync[]) =>
  create().post('/user_progress', { progress: lessonsToSync });

