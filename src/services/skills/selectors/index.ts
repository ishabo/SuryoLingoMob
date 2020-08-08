import { ISkill } from '..'

export const getSkillsByUnit = (unit: number) => (state: ISkill[]): ISkill[] =>
  state.filter((skill: ISkill) => skill.unit === unit)

export const getPublishedSkills = (state: ISkill[]): ISkill[] =>
  state.filter((skill: ISkill) => !skill.isComingSoon)

export const getComingSoonSkills = (state: ISkill[]): ISkill[] =>
  state.filter((skill: ISkill) => skill.isComingSoon)
