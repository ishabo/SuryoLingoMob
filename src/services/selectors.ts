import { IInitialState } from './reducers';
import cloneDeep from 'clone-deep';
import { isEmpty, uniqBy } from 'lodash';
import * as courses from './courses';
import * as skills from './skills';
import * as questions from './questions';
import * as exceptions from './exceptions';
import * as assets from './assets';
import * as leaderboard from './leaderboard';
import { Platform } from 'react-native';
import { ILessonToSync } from '@sl/services/progress';
import { hintify } from '@sl/helpers';
import VersionNumber from 'react-native-version-number';
import { IDeviceSettings } from '@sl/services/settings';

const allLessons = (skills: skills.ISkill[]) =>
  [].concat.apply([], skills.map((skill: skills.ISkill) => skill.lessons));

const selectLesson = (skills: skills.ISkill[], lessonId: string): skills.ILesson =>
  allLessons(skills).find((lesson: skills.ILesson) => lesson.id === lessonId);

export const getActiveCourse = (state: IInitialState): courses.ICourse =>
  courses.selectors.getActiveCourse(state.courses);

export const getComingSoonSkills = (state: IInitialState) => skills.selectors.getComingSoonSkills(state.skills);

export const getPublishedSkills = (state: IInitialState) => skills.selectors.getPublishedSkills(state.skills);

export const getTargetLanguage = (state: IInitialState) => courses.selectors.getTargetLanguage(state.courses);

export const getSourceLanguage = (state: IInitialState) => courses.selectors.getSourceLanguage(state.courses);

export const getPending = (state: IInitialState) => questions.selectors.getPending(state.questions);

export const calcProress = (state: IInitialState) => questions.selectors.calcProress(state.questions);

export const getCurrentQuestion = (state: IInitialState) => questions.selectors.getCurrentQuestion(state.questions);

export const allCorrectAnswers = (state: IInitialState, questionId: string) =>
  questions.selectors.allCorrectAnswers(state.questions, questionId);

export const getLessonInProgress = (state: IInitialState): skills.ILesson =>
  selectLesson(state.skills, state.progress.lessonInProgress);

export const getSkillsByUnit = (unit: number) => (state: IInitialState): skills.ISkill[] =>
  skills.selectors.getSkillsByUnit(unit)(state.skills);

export const getSkillInProgress = (state: IInitialState): skills.ISkill => {
  const lessonId = state.progress.lessonInProgress;

  return state.skills.find(
    (skill: skills.ISkill) =>
      skill.lessons.find((skillLesson: skills.ILesson) => skillLesson.id === lessonId) !== void 0
  );
};

export const getSkillProgress = (state: IInitialState): skills.ISkill[] => {
  const skills = cloneDeep(state.skills).map((skill: skills.ISkill) => {
    const totalLessons = skill.lessons.length;
    const filterByFinished = (lesson: skills.ILesson) => lesson.finished;
    const numOfLessonsDone = skill.lessons.filter(filterByFinished).length;
    skill.progress = numOfLessonsDone / totalLessons;
    return skill;
  });

  return skills;
};

const orderLessonsByOrder = (lessons: skills.ILesson[]) => {
  const compare = (a: skills.ILesson, b: skills.ILesson) => {
    if (a.order < b.order) return -1;
    if (a.order > b.order) return 1;
    return 0;
  };
  const filteredLessons = cloneDeep(lessons).sort(compare);

  if (Platform.OS === 'android') {
    return filteredLessons.reverse();
  } else {
    return filteredLessons;
  }
};

export const getSkillLessons = (skillId: string) => (state: IInitialState): skills.ILesson[] =>
  orderLessonsByOrder(state.skills.find((skill: skills.ISkill) => skill.id === skillId).lessons);

export const numOfTimesLessonInProgressPassed = (state: IInitialState): number => {
  const lesson = selectLesson(state.skills, state.progress.lessonInProgress);
  if (lesson) {
    return lesson.lessonHistory.length;
  }
  return 0;
};

export const getLessonsToSync = (state: IInitialState): ILessonToSync[] => state.progress.lessonsToSync;

export const isRegistered = (state: IInitialState): boolean =>
  typeof state.profile.email === 'string' && state.profile.email.length > 3;

export const userIsTester = (state: IInitialState): boolean => state.profile.isTester !== null;

export const isLoading = (state: IInitialState): boolean => state.api.loading;

export const getLatestException = (state: IInitialState): exceptions.IException =>
  exceptions.selectors.getLatestException(state.exceptions);

export const hasFetchedSkills = (state: IInitialState): boolean =>
  !isEmpty(state.courses) && !isEmpty(state.skills) && !isEmpty(state.profile);

export const hasNetworkError = (state: IInitialState): boolean =>
  exceptions.selectors.hasNetworkError(state.exceptions);

export const calcTotaluserXp = (state: IInitialState): number =>
  state.skills.reduce((total: number, skill: skills.ISkill): number => total + skill.totalSkillXp, 0);

export const getSkillIcon = (state: IInitialState) => (icon: string, size: assets.TImageSizes): assets.ISkillIcon =>
  assets.selectors.getSkillIcon(icon, size)(state.assets);

export const getPhrases = (state: IInitialState): questions.IPhrase[] => {
  const phrases = state.questions.onGoing.map(({ phrase, translation, soundFiles }) => {
    const sentence = {
      raw: phrase,
      hintified: hintify(phrase, state.dictionaries, getActiveCourse(state).targetLanguage.shortName)
    };

    return {
      sentence,
      translation,
      sound: soundFiles[0]
    };
  });

  return uniqBy(phrases, phrase => phrase.sentence.raw);
};

export const isUserInLeaderboard = (state: IInitialState): boolean =>
  state.leaderboard.topUsers &&
  !!state.leaderboard.topUsers.find((user: leaderboard.ILeaderboardUser) => user.id === state.profile.id);

export const isOnMaintenance = (state: IInitialState): boolean =>
  !!(state.settings.maintenance && state.settings.maintenance.switchedOn);

export const getDeviceSpecificSettings = (state: IInitialState): IDeviceSettings => state.settings[Platform.OS];

export const shouldUpdateApp = (state: IInitialState): boolean => {
  const device = getDeviceSpecificSettings(state);
  if (device) {
    const currentVersion = VersionNumber.appVersion;
    return currentVersion < device.version && device.update.since <= currentVersion;
  }

  return false;
};

export const canProceedToStudy = (state: IInitialState): boolean => {
  if (isOnMaintenance(state) && !userIsTester(state)) {
    return false;
  }

  const device = getDeviceSpecificSettings(state);

  if (shouldUpdateApp(state) && device && device.update && device.update.force && !userIsTester(state)) {
    return false;
  }

  return true;
};
