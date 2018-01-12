import Splash from 'scenes/Splash';
import Signon from 'scenes/Signon';
import Courses from 'scenes/Courses';
import Skills from 'scenes/Skills';
import Lessons from 'scenes/Lessons';
import Questions from 'scenes/Questions';
import Completion from 'scenes/Completion';
import { StackNavigator } from 'react-navigation';

const QuestionsNav = StackNavigator({
  Questions: { screen: Questions },
  Completion: { screen: Completion },
});

export default
  {
    Splash: { screen: Splash },
    Signon: { screen: Signon },
    Courses: { screen: Courses },
    Skills: { screen: Skills },
    Lessons: { screen: Lessons },
    Lesson: { screen: QuestionsNav },
  };
