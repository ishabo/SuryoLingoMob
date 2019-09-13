import cloneDeep from 'clone-deep';
import { isEmpty, uniqBy } from 'lodash';
import * as courses from './courses';
import * as skills from './skills';
import * as questions from './questions';
import * as exceptions from './exceptions';
import * as assets from './assets';
import { Platform } from 'react-native';
import { hintify } from 'helpers';
import VersionNumber from 'react-native-version-number';
const allLessons = (skills) => [].concat.apply([], skills.map((skill) => skill.lessons));
const selectLesson = (skills, lessonId) => allLessons(skills).find((lesson) => lesson.id === lessonId);
export const getActiveCourse = (state) => courses.selectors.getActiveCourse(state.courses);
export const getComingSoonSkills = (state) => skills.selectors.getComingSoonSkills(state.skills);
export const getPublishedSkills = (state) => skills.selectors.getPublishedSkills(state.skills);
export const getTargetLanguage = (state) => courses.selectors.getTargetLanguage(state.courses);
export const getSourceLanguage = (state) => courses.selectors.getSourceLanguage(state.courses);
export const getPending = (state) => questions.selectors.getPending(state.questions);
export const calcProress = (state) => questions.selectors.calcProress(state.questions);
export const getCurrentQuestion = (state) => questions.selectors.getCurrentQuestion(state.questions);
export const allCorrectAnswers = (state, questionId) => questions.selectors.allCorrectAnswers(state.questions, questionId);
export const getLessonInProgress = (state) => selectLesson(state.skills, state.progress.lessonInProgress);
export const getSkillsByUnit = (unit) => (state) => skills.selectors.getSkillsByUnit(unit)(state.skills);
export const getSkillInProgress = (state) => {
    const lessonId = state.progress.lessonInProgress;
    return state.skills.find((skill) => skill.lessons.find((skillLesson) => skillLesson.id === lessonId) !== void 0);
};
export const getSkillProgress = (state) => {
    const skills = cloneDeep(state.skills).map((skill) => {
        const totalLessons = skill.lessons.length;
        const filterByFinished = (lesson) => lesson.finished;
        const numOfLessonsDone = skill.lessons.filter(filterByFinished).length;
        skill.progress = numOfLessonsDone / totalLessons;
        return skill;
    });
    return skills;
};
const orderLessonsByOrder = (lessons) => {
    const compare = (a, b) => {
        if (a.order < b.order)
            return -1;
        if (a.order > b.order)
            return 1;
        return 0;
    };
    const filteredLessons = cloneDeep(lessons).sort(compare);
    if (Platform.OS === 'android') {
        return filteredLessons.reverse();
    }
    else {
        return filteredLessons;
    }
};
export const getSkillLessons = (skillId) => (state) => orderLessonsByOrder(state.skills.find((skill) => skill.id === skillId).lessons);
export const numOfTimesLessonInProgressPassed = (state) => {
    const lesson = selectLesson(state.skills, state.progress.lessonInProgress);
    if (lesson) {
        return lesson.lessonHistory.length;
    }
    return 0;
};
export const getLessonsToSync = (state) => state.progress.lessonsToSync;
export const isRegistered = (state) => typeof state.profile.email === 'string' && state.profile.email.length > 3;
export const userIsTester = (state) => state.profile.isTester !== null;
export const isLoading = (state) => state.api.loading;
export const getLatestException = (state) => exceptions.selectors.getLatestException(state.exceptions);
export const hasFetchedSkills = (state) => !isEmpty(state.courses) && !isEmpty(state.skills) && !isEmpty(state.profile);
export const hasNetworkError = (state) => exceptions.selectors.hasNetworkError(state.exceptions);
export const calcTotaluserXp = (state) => state.skills.reduce((total, skill) => total + skill.totalSkillXp, 0);
export const getSkillIcon = (state) => (icon, size) => assets.selectors.getSkillIcon(icon, size)(state.assets);
export const getPhrases = (state) => {
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
export const isUserInLeaderboard = (state) => state.leaderboard.topUsers &&
    !!state.leaderboard.topUsers.find((user) => user.id === state.profile.id);
export const isOnMaintenance = (state) => !!(state.settings.maintenance && state.settings.maintenance.switchedOn);
export const getDeviceSpecificSettings = (state) => state.settings[Platform.OS];
export const shouldUpdateApp = (state) => {
    const device = getDeviceSpecificSettings(state);
    if (device) {
        const currentVersion = VersionNumber.appVersion;
        return currentVersion < device.version && device.update.since <= currentVersion;
    }
    return false;
};
export const canProceedToStudy = (state) => {
    if (isOnMaintenance(state) && !userIsTester(state)) {
        return false;
    }
    const device = getDeviceSpecificSettings(state);
    if (shouldUpdateApp(state) && device && device.update && device.update.force && !userIsTester(state)) {
        return false;
    }
    return true;
};
//# sourceMappingURL=selectors.js.map