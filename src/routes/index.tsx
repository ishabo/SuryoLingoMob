import React from 'react';
import Splash from '@sl/scenes/Splash';
import Signon from '@sl/scenes/Signon';
import Courses from '@sl/scenes/Courses';
import Skills from '@sl/scenes/Skills';
import Lessons from '@sl/scenes/Lessons';
import LessonOverview from '@sl/scenes/LessonOverview';
import Questions from '@sl/scenes/Questions';
import Completion from '@sl/scenes/Completion';
import Leaderboard from '@sl/scenes/Leaderboard';
import Profile from '@sl/scenes/Profile';
import Drawer from '@sl/scenes/Drawer';
import PasswordRecovery from '@sl/scenes/PasswordRecovery';

import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import colors from '@sl/styles/colors';

const DrawerNav = DrawerNavigator(
  {
    Courses: { screen: Courses },
    Course: { screen: Skills },
    Profile: { screen: Profile },
    Leaderboard: { screen: Leaderboard },
    Signon: { screen: Signon },
  },
  {
    contentComponent: props => <Drawer {...props} />,
    initialRouteName: 'Course',
    drawerPosition: Platform.OS === 'android' ? 'right' : 'left',
  },
);

export const AppNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Courses: { screen: Courses },
    Skills: {
      screen: DrawerNav,
      navigationOptions: { headerMode: 'none', visible: false },
    },
    PasswordRecovery: {
      screen: PasswordRecovery,
      navigationOptions: { visible: false },
    },
    Lessons: { screen: Lessons },
    Questions: {
      screen: Questions,
      navigationOptions: {
        mode: 'modal',
      },
    },
    LessonOverview: { screen: LessonOverview },
    Completion: { screen: Completion },
  },
  {
    initialRouteName: 'Splash',
    navigationOptions: {
      headerStyle: { backgroundColor: colors.snow },
    },
  },
);
