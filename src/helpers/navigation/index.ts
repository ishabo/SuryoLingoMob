import { NavigationActions } from 'react-navigation'
import { ISkill } from '@sl/services/skills'

export const navToSkills = () =>
  NavigationActions.navigate({ routeName: 'Skills' })

export const navToSignon = () =>
  NavigationActions.navigate({ routeName: 'Signon' })

export const navToCourses = () =>
  NavigationActions.navigate({ routeName: 'Courses' })

export const navToLessons = (skill: ISkill) =>
  NavigationActions.navigate({
    routeName: 'Lessons',
    params: { skill },
  })

export const resetToLessons = (skill: ISkill) =>
  NavigationActions.reset({
    index: 1,
    key: null,
    actions: [navToSkills(), navToLessons(skill)],
  })

export const resetToSignon = () =>
  NavigationActions.reset({
    index: 0,
    key: null,
    actions: [navToSignon()],
  })

export const resetToCourses = () =>
  NavigationActions.reset({
    index: 0,
    key: null,
    actions: [navToCourses()],
  })

export const resetToSkills = () =>
  NavigationActions.reset({
    index: 0,
    key: null,
    actions: [navToSkills()],
  })
