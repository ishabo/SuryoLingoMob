import Splash from 'scenes/Splash';
import Signon from 'scenes/Signon';
import Courses from 'scenes/Courses';
import Skills from 'scenes/Skills';
import Lessons from 'scenes/Lessons';
import Questions from 'scenes/Questions';
import Completion from 'scenes/Completion';
import Profile from 'scenes/Profile';
import PasswordRecovery from 'scenes/PasswordRecovery';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

const TabStack = TabNavigator(
  {
    Courses: { screen: Courses },
    Skills: { screen: Skills },
    Profile: { screen: Profile },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    lazy: true,
  },
);

const LessonStack = StackNavigator({
  Questions: { screen: Questions },
  Completion: { screen: Completion },
});

export const AppNavigator = StackNavigator(
  {
    Splash: { screen: Splash },
    Signon: { screen: Signon },
    PasswordRecovery: { screen: PasswordRecovery },
    Lessons: { screen: Lessons },
    Lesson: { screen: LessonStack },
    Skills: { screen: TabStack },
  },
  {
    initialRouteName: 'Splash',
  });
