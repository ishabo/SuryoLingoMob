import { StackNavigator } from 'react-navigation';
import Splash from '../scenes/Splash';
import Intro from '../scenes/Intro';
import Modules from '../scenes/Modules';
import Lessons from '../scenes/Lessons';
import Questions from '../scenes/Lessons/Questions';

export default StackNavigator({
	Splash: { screen: Splash },
	Intro: { screen: Intro },
	Modules: { screen: Modules },
	Lessons: { screen: Lessons },
	Questions: { screen: Questions },
}, { mode: 'card' });


