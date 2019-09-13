import { create } from 'services/api';
export const getSkills = (courseId) => {
    const api = create();
    return api.get(`/skills?course=${courseId}`);
};
//# sourceMappingURL=index.js.map