import * as progress from 'services/progress';
export default (store) => () => {
    if (store.getState().progress.lessonsToSync.length > 0) {
        store.dispatch(progress.actions.syncFinishedLessons());
    }
};
//# sourceMappingURL=subscribers.js.map