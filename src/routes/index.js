import React from 'react';
import Splash from 'scenes/Splash';
import Signon from 'scenes/Signon';
import Courses from 'scenes/Courses';
import Skills from 'scenes/Skills';
import Lessons from 'scenes/Lessons';
import LessonOverview from 'scenes/LessonOverview';
import Questions from 'scenes/Questions';
import Completion from 'scenes/Completion';
import Leaderboard from 'scenes/Leaderboard';
import Profile from 'scenes/Profile';
import Drawer from 'scenes/Drawer';
import PasswordRecovery from 'scenes/PasswordRecovery';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import colors from 'styles/colors';
const DrawerNav = DrawerNavigator({
    Courses: { screen: Courses },
    Course: { screen: Skills },
    Profile: { screen: Profile },
    Leaderboard: { screen: Leaderboard },
    Signon: { screen: Signon }
}, {
    contentComponent: props => React.createElement(Drawer, Object.assign({}, props)),
    initialRouteName: 'Course',
    drawerPosition: Platform.OS === 'android' ? 'right' : 'left'
});
export const AppNavigator = StackNavigator({
    Splash: { screen: Splash },
    Courses: { screen: Courses },
    Skills: { screen: DrawerNav, navigationOptions: { headerMode: 'none', visible: false } },
    PasswordRecovery: { screen: PasswordRecovery, navigationOptions: { visible: false } },
    Lessons: { screen: Lessons },
    Questions: {
        screen: Questions,
        navigationOptions: {
            mode: 'modal'
        }
    },
    LessonOverview: { screen: LessonOverview },
    Completion: { screen: Completion }
}, {
    initialRouteName: 'Splash',
    navigationOptions: {
        headerStyle: { backgroundColor: colors.snow }
    }
});
//# sourceMappingURL=index.js.map