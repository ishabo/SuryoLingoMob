import { create } from 'services/api';
export const getQuestions = (lessonId) => {
    const api = create();
    return api.get(`/questions?lesson=${lessonId}`);
};
//# sourceMappingURL=index.js.map