import { AppNavigator } from 'routes/index';
export const initialState = AppNavigator ? AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Splash'), null) : null;
export const reducer = (state = initialState, action) => {
    const nextState = AppNavigator
        ? AppNavigator.router.getStateForAction(action, state)
        : null;
    return nextState || state;
};
//# sourceMappingURL=index.js.map