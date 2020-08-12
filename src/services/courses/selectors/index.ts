import { ICourse } from '..'

export const getActiveCourse = (state: ICourse[]): ICourse =>
  state.find((course: ICourse) => course.active && !course.comingSoon)

const getLanguage = (state: ICourse[], lang: 'target' | 'source') => {
  const activeCourse = getActiveCourse(state)
  if (activeCourse) {
    return activeCourse[`${lang}Language`].shortName
  }
  return 'cl-ara'
}

export const getTargetLanguage = (state: ICourse[]) =>
  getLanguage(state, 'target')
export const getSourceLanguage = (state: ICourse[]) =>
  getLanguage(state, 'source')
