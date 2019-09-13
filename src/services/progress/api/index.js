import { create } from 'services/api';
export const getLesson = (lessonId) => create().get(`/questions?lesson=${lessonId}`);
export const syncFinishedLessons = (lessonsToSync) => create().post('/user_progress', { progress: lessonsToSync });
//# sourceMappingURL=index.js.map