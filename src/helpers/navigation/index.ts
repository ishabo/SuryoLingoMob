import { NavigationActions } from 'react-navigation';
import { ICourse } from 'services/courses';
import { ISkill } from 'services/skills';

export const navToSkills = (course: ICourse) =>
  NavigationActions.navigate({
    routeName: 'Skills', params: {
      title: course.targetLanguage.shortName,
    },
  });

export const navToSignon = () =>
  NavigationActions.navigate({
    routeName: 'Signon',
  });

export const navToLessons = (skill: ISkill) =>
  NavigationActions.navigate({
    routeName: 'Lessons',
    params: { skill },
  });

export const resetToLessons = (course: ICourse, skill: ISkill) => NavigationActions.reset({
  index: 1,
  key: null,
  actions: [
    navToSkills(course),
    navToLessons(skill),
  ],
});

export const resetToSignon = () => NavigationActions.reset({
  index: 0,
  key: null,
  actions: [
    navToSignon(),
  ],
});
