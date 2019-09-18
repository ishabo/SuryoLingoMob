import { call, put, select } from 'redux-saga/effects';
import * as skills from '@sl/services/skills';
import { getActiveCourse } from '@sl/services/selectors';
import * as exceptions from '@sl/services/exceptions';
import { ISagasFunctions } from '@sl/services/sagas';
import * as assets from '@sl/services/assets';
import { setLoadingOn, setLoadingOff } from '@sl/services/api/actions';

export function* fetchSkills(): IterableIterator<any> {
  const activeCourse = yield select(getActiveCourse);

  if (activeCourse) {
    yield put(setLoadingOn());
    try {
      const response = yield call(skills.api.getSkills, activeCourse.id);
      yield put(skills.actions.saveSkills(response));
      yield put(assets.actions.fetchSkillIcons());
    } catch (error) {
      yield put(exceptions.actions.add(error));
    }

    yield put(setLoadingOff());
  }
}

export const functions = (): ISagasFunctions[] => [{ action: skills.actions.types.FETCH_SKILLS, func: fetchSkills }];
