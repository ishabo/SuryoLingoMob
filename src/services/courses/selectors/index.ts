import { ICourse } from '../';

export const getActiveCourse = (state: ICourse[]): ICourse =>
  state.find((course: ICourse) => course.active);

const getLanguage = (state: ICourse[], lang: 'target' | 'learners') => {
  const activeCourse = getActiveCourse(state);
  if (activeCourse) {
    return activeCourse[`${lang}Language`].shortName;
  } else {
    throw new Error('No active course selected!');
  }
};
export const getTargetLanguage = (state: ICourse[]) => getLanguage(state, 'target');
export const getLearnersLanguage = (state: ICourse[]) => getLanguage(state, 'learners');