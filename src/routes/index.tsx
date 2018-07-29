import React from 'react';
import Splash from 'scenes/Splash';
import Signon from 'scenes/Signon';
import Courses from 'scenes/Courses';
import Skills from 'scenes/Skills';
import Lessons from 'scenes/Lessons';
import LessonOverview from 'scenes/LessonOverview';
import Questions from 'scenes/Questions';
import Completion from 'scenes/Completion';
import Profile from 'scenes/Profile';
import Drawer from 'scenes/Drawer';
import PasswordRecovery from 'scenes/PasswordRecovery';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Platform } from 'react-native';

const SignonStack = StackNavigator({
  Signon: { screen: Signon },
  PasswordRecovery: { screen: PasswordRecovery, navigationOptions: { visible: false } }
});

const DrawerNav = DrawerNavigator(
  {
    Courses: { screen: Courses, navigationOptions: { visible: true } },
    Course: { screen: Skills },
    Profile: { screen: Profile }
  },
  {
    contentComponent: props => <Drawer {...props} />,
    initialRouteName: 'Course',
    drawerPosition: Platform.OS === 'android' ? 'right' : 'left'
  }
);

export const AppNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Skills: { screen: DrawerNav },
    Signon: { screen: SignonStack },
    Lessons: { screen: Lessons },
    Questions: { screen: Questions },
    LessonOverview: { screen: LessonOverview },
    Completion: { screen: Completion }
  },
  {
    initialRouteName: 'Splash'
  }
);
