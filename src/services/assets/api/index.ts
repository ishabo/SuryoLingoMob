import { create } from '@sl/services/api'

export const getSkillIcons = () => {
  const api = create()
  return api.get('/assets?what=skill_icons')
}

export const getCourseImages = () => {
  const api = create()
  return api.get('/assets?what=course_images')
}
