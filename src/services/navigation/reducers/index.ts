import { AppNavigator } from '../../../scenes/Navigation';

export const navigationInitialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Splash'),
  null,
);

export const navigationReducer = (state = navigationInitialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  return nextState || state;
};
