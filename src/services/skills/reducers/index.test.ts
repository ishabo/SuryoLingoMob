import { reducer as skillReducer } from './index';
import { types } from '../actions';
import { skills } from '@sl/data/dummy/skills';
import cloneDeep from 'clone-deep';

import MockDate from 'mockdate';

describe('course reducer', () => {
  it('saves skills', () => {
    const action = {
      payload: [...skills],
      type: types.SAVE_SKILLS,
    };

    const state = [];
    const newState = [...skills];

    newState[0].active = true;
    newState[1].active = true;
    const updatedState = skillReducer(state, action);
    expect(JSON.stringify(updatedState)).toEqual(JSON.stringify(newState));
  });

  it('activate unit', () => {
    const action = {
      unit: 2,
      type: types.ACTIVATE_UNIT,
    };

    const state = [...skills];
    const newState = [...skills];

    newState[2].active = true;
    newState[3].active = true;
    const updatedState = skillReducer(state, action);
    expect(JSON.stringify(updatedState)).toEqual(JSON.stringify(newState));
  });

  it('mark lesson finished unit', () => {
    MockDate.set('06/06/2015');
    const timestamp1 = new Date('2015-01-01 11:11:00');
    const timestamp2 = new Date();
    const action = {
      lessonXP: 100,
      lessonId: '11',
      timestamp: timestamp2,
      type: types.MARK_LESSON_FINISHED,
    };

    const state = cloneDeep(skills);

    state[0].lessons[0].finished = false;
    state[0].lessons[0].totalLessonXp = 50;
    state[0].lessons[0].lessonHistory = [
      {
        timestamp: timestamp1,
        thisLessonXp: 50,
      },
    ];
    state[0].progress = 0.5;
    state[0].totalSkillXp = 0;

    const newState = cloneDeep(state);
    newState[0].lessons[0].finished = true;
    newState[0].lessons[0].totalLessonXp = 150;
    newState[0].lessons[0].lessonHistory.push({
      timestamp: timestamp2,
      thisLessonXp: 100,
    });
    newState[0].progress = 0.5;

    newState[0].totalSkillXp = 150;

    const updatedState = skillReducer(state, action);
    expect(updatedState[0]).toEqual(newState[0]);
  });
});
