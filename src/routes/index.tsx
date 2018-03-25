import Splash from 'scenes/Splash';
import Signon from 'scenes/Signon';
import Courses from 'scenes/Courses';
import Skills from 'scenes/Skills';
import Lessons from 'scenes/Lessons';
import Questions from 'scenes/Questions';
import Completion from 'scenes/Completion';
import Profile from 'scenes/Profile';
import PasswordRecovery from 'scenes/PasswordRecovery';
import { StackNavigator, TabNavigator, TabBarTop } from 'react-navigation';
import colors from 'styles/colors';

const TabStack = TabNavigator(
  {
    Courses: { screen: Courses },
    Skills: { screen: Skills },
    Profile: { screen: Profile },
  },
  {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: colors.white,
      inactiveTintColor: colors.white,
      inactiveBackgroundColor: colors.orange,
      activeBackgroundColor: colors.yellow,
      showIcon: false,
      indicatorStyle: {
        borderBottomColor: colors.white,
        borderBottomWidth: 2,
      },
      labelStyle: {
        fontSize: 12,
        justifyContent: 'center',
        alignItems: 'center',
      },
      style: {
        backgroundColor: colors.orange,
      },
      tabStyle: {
        justifyContent: 'center',
        alignItems: 'center',
      }
    },

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
