import { NavigationActions } from 'react-navigation';
import { ISkill } from 'services/skills';
import { IProfile } from 'services/profile';

export const navToSkills = (profile: IProfile) =>
  NavigationActions.navigate({
    routeName: 'Skills', params: {
      userXp: profile.userXp,
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

export const resetToLessons = (profile: IProfile, skill: ISkill) => NavigationActions.reset({
  index: 1,
  key: null,
  actions: [
    navToSkills(profile),
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

export const resetToSkills = (profile: IProfile) => NavigationActions.reset({
  index: 0,
  key: null,
  actions: [
    navToSkills(profile),
  ],
});

