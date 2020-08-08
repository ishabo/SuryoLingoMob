import { IAssets } from '../'

const namespace = 'SuryoLingo/assets'

export const types = {
  SET_SKILL_ICONS: `${namespace}/SET_SKILL_ICONS`,
  FETCH_SKILL_ICONS: `${namespace}/FETCH_SKILL_ICONS`,
  SET_COURSE_IMAGES: `${namespace}/SET_COURSE_IMAGES`,
  FETCH_COURSE_IMAGES: `${namespace}/FETCH_COURSE_IMAGES`,
}

export const setSkillIcons = (skillIcons: IAssets['skillIcons']) => ({
  skillIcons,
  type: types.SET_SKILL_ICONS,
})

export const fetchSkillIcons = () => ({
  type: types.FETCH_SKILL_ICONS,
})

export const setCourseImages = (courseImages: IAssets['courseImages']) => ({
  courseImages,
  type: types.SET_COURSE_IMAGES,
})

export const fetchCourseImages = () => ({
  type: types.FETCH_COURSE_IMAGES,
})
