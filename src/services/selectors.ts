import { IInitialState } from './reducers';
import { ICourse } from './courses/reducers';
import { ISkill, ILesson } from './skills/reducers';
import cloneDeep from 'clone-deep';
import * as questions from './questions/selectors';

const allLessons = (skills: ISkill[]) =>
  [].concat.apply([], skills.map((skill: ISkill) => skill.lessons));

const selectLesson = (skills: ISkill[], lessonId: string) =>
  allLessons(skills).find((lesson: ILesson) => lesson.id === lessonId);

export const getActiveCourse = (state: IInitialState): ICourse =>
  state.courses.find((course: ICourse) => course.active);

export const getTargetLanguage = (state: IInitialState) => {
  const activeCourse = getActiveCourse(state);
  if (activeCourse) {
    return activeCourse.targetLanguage.name;
  } else {
    throw new Error('No active course selected!');
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

export const getLessonInProgress = (state: IInitialState): ILesson =>
  selectLesson(state.skills, state.progress.lessonInProgress);

export const getSkillsByUnit = (unit: number) => (state: IInitialState): ISkill[] =>
  state.skills.filter((skill: ISkill) => skill.unit === unit);

export const getSkillInProgress = (state: IInitialState): ISkill => {
  const lessonId = state.progress.lessonInProgress;

  return state.skills.find((skill: ISkill) =>
    skill.lessons.find((skillLesson: ILesson) => skillLesson.id === lessonId) !== void (0),
  );
};

export const getSkillProgress = (state: IInitialState): ISkill[] => {
  const skills = cloneDeep(state.skills).map((skill: ISkill) => {
    const totalLessons = skill.lessons.length;
    const numOfLessonsDone = skill.lessons.filter((lesson: ILesson) => lesson.finished).length;
    skill.progress = numOfLessonsDone / totalLessons;
    return skill;
  });

  return skills;
};

export const getSkillLessons = (skillId: string) => (state: IInitialState): ILesson[] =>
  state.skills.find((skill: ISkill) => skill.id === skillId).lessons;
