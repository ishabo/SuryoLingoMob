import { create } from 'services/api';
export const getLeaderboard = (courseId) => {
    const api = create();
    return api.get(`/leaderboards?course=${courseId}&limit=10`);
};
//# sourceMappingURL=index.js.map