import { IAssets, TImageSizes, ISkillIcon } from '../';

export const getSkillIcon = (icon: string, size: TImageSizes) => (state: IAssets): ISkillIcon => {
  const skillIcon = state['skillIcons'][icon];
  if (skillIcon) {
    return skillIcon[size];
  }
  return {
    locked: '',
    unlocked: '',
  };
};
