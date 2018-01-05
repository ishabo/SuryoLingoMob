import { IInitialState } from './reducers';
import * as courses from './courses';
import * as skills from './skills';
import cloneDeep from 'clone-deep';
import * as questions from './questions/selectors';
import { Platform } from 'react-native';

const allLessons = (skills: skills.ISkill[]) =>
  [].concat.apply([], skills.map((skill: skills.ISkill) => skill.lessons));

const selectLesson = (skills: skills.ISkill[], lessonId: string) =>
  allLessons(skills).find((lesson: skills.ILesson) => lesson.id === lessonId);

export const getActiveCourse = (state: IInitialState): courses.ICourse =>
  courses.selectors.getActiveCourse(state.courses);

export const getTargetLanguage = (state: IInitialState) =>
  courses.selectors.getTargetLanguage(state.courses);

export const getPendingQuestions = (state: IInitialState) =>
  questions.getPendingQuestions(state.questions);

export const calcProress = (state: IInitialState) =>
  questions.calcProress(state.questions);

export const getCurrentQuestion = (state: IInitialState) =>
  questions.getCurrentQuestion(state.questions);

export const allCorrectAnswers = (state: IInitialState, questionId: string) =>
  questions.allCorrectAnswers(state.questions, questionId);

export const getLessonInProgress = (state: IInitialState): skills.ILesson =>
  selectLesson(state.skills, state.progress.lessonInProgress);

export const getSkillsByUnit = (unit: number) => (state: IInitialState): skills.ISkill[] =>
  skills.selectors.getSkillsByUnit(unit)(state.skills);

export const getSkillInProgress = (state: IInitialState): skills.ISkill => {
  const lessonId = state.progress.lessonInProgress;

  return state.skills.find((skill: skills.ISkill) =>
    skill.lessons.find((skillLesson: skills.ILesson) => skillLesson.id === lessonId) !== void (0),
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
    if (a.order < b.order)
      return -1;
    if (a.order > b.order)
      return 1;
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
  orderLessonsByOrder(
    state.skills.find((skill: skills.ISkill) => skill.id === skillId).lessons,
  );
