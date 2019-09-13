import { types } from '../actions';
export const initialState = {
    topUsers: [],
    currentUserPosition: 0,
    currentUserCourseXpRatio: 0
};
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_LEADERBOARD:
            return action.leaderboard;
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map