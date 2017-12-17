import { IInitialState } from './reducers';
import { ICourse } from './courses/reducers';
import { ISkill, ILesson } from './skills/reducers';

import * as course from './courses/selectors';
import * as questions from './questions/selectors';

export const getActiveCourse = (state: IInitialState): ICourse =>
  course.getActiveCourse(state.courses, state.progress.activeCourse);

export const getTargetLanguage = (state: IInitialState) => {
  const activeCourse = course.getActiveCourse(state.courses, state.progress.activeCourse);
  if (activeCourse) {
    return activeCourse.targetLanguage.name;
  }
};

export const getPendingQuestions = (state: IInitialState) =>
  questions.getPendingQuestions(state.questions);

export const calcProress = (state: IInitialState) =>
  questions.calcProress(state.questions);

export const getCurrentQuestion = (state: IInitialState) =>
  questions.getCurrentQuestion(state.questions);

export const allCorrectAnswers = (state: IInitialState, questionId: string) =>
  questions.allCorrectAnswers(state.questions, questionId);

const allLessons = (skills: ISkill[]) =>
  [].concat.apply([], skills.map((skill: ISkill) => skill.lessons));

const selectLesson = (skills: ISkill[], lessonId: string) =>
  allLessons(skills).find((lesson: ILesson) => lesson.id === lessonId);

export const getLessonInProgress = (state: IInitialState): ILesson =>
  selectLesson(state.skills, state.progress.lessonInProgress);

export const getSkillInProgres = (state: IInitialState): string => {
  const lessonId = state.progress.lessonInProgress;
  const skillInProgress = state.skills.filter((skill: ISkill) =>
    skill.lessons.find((skillLesson: ILesson) => skillLesson.id === lessonId) !== null,
  );

  return skillInProgress[0].id;
};
