import { StackNavigator } from 'react-navigation';
import Splash from '../scenes/Splash';
import Intro from '../scenes/Intro';
import Courses from '../scenes/Courses';
import Modules from '../scenes/Modules';
import Lessons from '../scenes/Lessons';
import Questions from '../scenes/Questions';
import Completion from '../scenes/Completion';

export default StackNavigator(
  {
    Splash: { screen: Splash },
    Intro: { screen: Intro },
    Courses: { screen: Courses },
    Modules: { screen: Modules },
    Lessons: { screen: Lessons },
    Questions: { screen: Questions },
    Completion: { screen: Completion },
  },
  { mode: 'card' },
);