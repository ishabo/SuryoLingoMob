import { StackNavigator } from 'react-navigation';

import Routes from 'routes';

export const AppNavigator = StackNavigator(Routes, {
  initialRouteName: 'Splash',
});
