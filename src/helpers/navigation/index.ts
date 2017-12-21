import { NavigationActions } from 'react-navigation';
import { ICourse } from '../../services/courses/reducers';

export const navToSkills = (course: ICourse) =>
  NavigationActions.navigate({
    routeName: 'Skills', params: {
      title: course.targetLanguage.name,
    },
  });
