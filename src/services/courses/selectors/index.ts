import { ICourse } from '../';

export const getActiveCourse = (state: ICourse[]): ICourse =>
  state.find((course: ICourse) => course.active);

export const getTargetLanguage = (state: ICourse[]) => {
  const activeCourse = getActiveCourse(state);
  if (activeCourse) {
    return activeCourse.targetLanguage.name;
  } else {
    // throw new Error('No active course selected!');
    return 'Syric';
  }
};
