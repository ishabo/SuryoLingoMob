import { reducer as progressReducer } from './index';
import { types } from '../actions';
import moment from 'moment';
import MockDate from 'mockdate';

describe('progress reducer', () => {

  const timestamp = moment();
  const skillsProgress = {
    'skill-id1': {
      finished: false,
      totalSkillXP: 400,
      lessonInProgress: null,
      lessonsDone: {
        'lesson-id1': {
          totalLessonXp: 400,
          history: [
            {
              timestamp,
              thisLessonXP: 200,
            },
            {
              timestamp,
              thisLessonXP: 200,
            },
          ],
        },
      },
    },
  };

  it('should set active course when none was selected', () => {

    const initialState = {
      activeCourse: null,
      skillsProgress: {},
      lessonInProgress: null,
      enrolledCourses: [],
      totalUserXP: 0,
    };
    const actions = {
      type: types.SET_ACTIVE_COUTSE,
      courseId: 'course-id',
    };

    const newState = progressReducer(initialState, actions);

    expect(newState).toEqual({
      activeCourse: 'course-id',
      skillsProgress: {},
      lessonInProgress: null,
      enrolledCourses: ['course-id'],
      totalUserXP: 0,
    });

  });

  it('should set active course when a previous was selected', () => {
    const initialState = {
      activeCourse: 'course-id1',
      skillsProgress: {},
      lessonInProgress: null,
      enrolledCourses: ['course-id1'],
      totalUserXP: 0,
    };

    const actions = {
      type: types.SET_ACTIVE_COUTSE,
      courseId: 'course-id2',
    };

    const newState = progressReducer(initialState, actions);

    expect(newState).toEqual({
      activeCourse: 'course-id2',
      skillsProgress: {},
      lessonInProgress: null,
      enrolledCourses: ['course-id1', 'course-id2'],
      totalUserXP: 0,
    });
  });

  it('should set skill in progress', () => {

    const initialState = {
      skillsProgress,
      lessonInProgress: null,
      activeCourse: 'course-id1',
      enrolledCourses: ['course-id1'],
      totalUserXP: 0,
    };

    const actions = {
      type: types.SET_SKILL_IN_ROGRESS,
      skillId: 'skill-id2',
    };

    const newState = progressReducer(initialState, actions);

    expect(newState).toEqual({
      activeCourse: 'course-id1',
      lessonInProgress: null,
      skillsProgress: {
        ...skillsProgress,
        'skill-id2': {
          finished: false,
          totalSkillXP: 0,
        },
      },
      enrolledCourses: ['course-id1'],
      totalUserXP: 0,
    });
  });

  it('should set lesson done', () => {

    MockDate.set('1/1/2000');

    const initialState = {
      skillsProgress,
      activeCourse: 'course-id1',
      lessonInProgress: null,
      enrolledCourses: ['course-id1'],
      totalUserXP: 0,
    };

    const actions = {
      type: types.SET_LESSON_DONE,
      skillId: 'skill-id1',
      lessonDone: {
        lessonId: 'lesson-id2',
        lessonXP: 200,
      },
    };

    const newState = progressReducer(initialState, actions);

    const updatedSkill = { ...skillsProgress };
    updatedSkill['skill-id1'].lessonsDone['lesson-id2'] = {
      totalLessonXp: 200,
      history: [
        {
          timestamp: moment(),
          thisLessonXP: 200,
        },
      ],
    };

    MockDate.reset();

    expect(newState).toEqual({
      activeCourse: 'course-id1',
      skillsProgress: updatedSkill,
      lessonInProgress: null,
      enrolledCourses: ['course-id1'],
      totalUserXP: 0,
    });
  });
});
