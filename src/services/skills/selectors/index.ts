import { ISkill } from '../';
export const getSkillsByUnit = (unit: number) => (state: ISkill[]): ISkill[] =>
    state.filter((skill: ISkill) => skill.unit === unit);
