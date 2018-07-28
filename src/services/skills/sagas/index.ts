import { call, put, select } from 'redux-saga/effects';
import * as skills from 'services/skills';
import { getActiveCourse } from 'services/selectors';
import { resetToSkills } from 'helpers';
import * as exceptions from 'services/exceptions';
import { ISagasFunctions } from 'services/sagas';
import * as assets from 'services/assets';

export function* fetchSkills(): IterableIterator<any> {
  const activeCourse = yield select(getActiveCourse);

  if (activeCourse) {
    try {
      const response = yield call(skills.api.getSkills, activeCourse.id);
      yield put(skills.actions.saveSkills(response));
      yield put(assets.actions.fetchSkillIcons());
    } catch (error) {
      yield put(exceptions.actions.add(error));
    }

    yield put(resetToSkills());
  }
}

export const functions = (): ISagasFunctions[] => [{ action: skills.actions.types.FETCH_SKILLS, func: fetchSkills }];
