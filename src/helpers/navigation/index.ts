import { NavigationActions } from 'react-navigation';
import { ICourse } from 'services/courses';

export const navToSkills = (course: ICourse) =>
  NavigationActions.navigate({
    routeName: 'Skills', params: {
      title: course.targetLanguage.name,
    },
  });
