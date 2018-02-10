import Splash from 'scenes/Splash';
import Signon from 'scenes/Signon';
import Courses from 'scenes/Courses';
import Skills from 'scenes/Skills';
import Lessons from 'scenes/Lessons';
import Questions from 'scenes/Questions';
import Completion from 'scenes/Completion';
import Profile from 'scenes/Profile';
import PasswordRecovery from 'scenes/PasswordRecovery';
// import { StyleSheet } from 'react-native';

import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

const TabStack = TabNavigator(
  {
    Skills: { screen: Skills },
    Courses: { screen: Courses },
    Profile: { screen: Profile },
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
  },
);

const LessonStack = StackNavigator({
  Questions: { screen: Questions },
  Completion: { screen: Completion },
});

// const style = StyleSheet.create({
//   headerStyle: {
//     borderBottomWidth: 0,
//   },
// });

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