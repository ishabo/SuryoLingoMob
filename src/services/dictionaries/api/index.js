import { create } from 'services/api';
export const getDictionaries = (courseId) => {
    const api = create();
    return api.get(`/dictionaries?course=${courseId}`);
};
//# sourceMappingURL=index.js.map